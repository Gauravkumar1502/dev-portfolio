import { reflectComponentType, type Type } from '@angular/core';
import { type Profile } from '../../models/profile.model';
import { type TermEntry } from '../../models/terminal.model';
import { findCommand } from './command-registry';
import { OUTPUTS } from './outputs';
import { TextOutput } from './outputs/text-output';

export interface ResolvedOutput {
  component: Type<unknown>;
  inputs: Record<string, unknown>;
}

const acceptsArgs = new Map<Type<unknown>, boolean>();

/** Maps a (data-only) entry to the component that renders it; `null` = no output. */
export function resolveOutput(entry: TermEntry, profile: Profile): ResolvedOutput | null {
  if (entry.error || !entry.name) return null;

  const component = OUTPUTS[entry.name];
  if (component) {
    if (!acceptsArgs.has(component)) {
      const inputs = reflectComponentType(component)?.inputs ?? [];
      acceptsArgs.set(
        component,
        inputs.some((i) => i.propName === 'args'),
      );
    }
    return { component, inputs: acceptsArgs.get(component) ? { args: entry.args } : {} };
  }

  const text = findCommand(entry.name)?.text?.(entry.args, profile);
  if (text === undefined) return null;
  return { component: TextOutput, inputs: { lines: Array.isArray(text) ? text : [text] } };
}
