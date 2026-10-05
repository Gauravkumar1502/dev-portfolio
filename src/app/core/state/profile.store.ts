import { computed, Injectable, signal } from '@angular/core';
import { PROFILE } from '../../data/profile.data';

/** Single source of truth for portfolio content, shared by GUI and terminal. */
@Injectable({ providedIn: 'root' })
export class ProfileStore {
  private readonly profile = signal(PROFILE).asReadonly();

  readonly name = computed(() => this.profile().name);
  readonly email = computed(() => this.profile().email);
  readonly socials = computed(() => this.profile().socials);
  readonly experience = computed(() => this.profile().experience);
  readonly projects = computed(() => this.profile().projects);
  readonly skills = computed(() => this.profile().skills);
  readonly education = computed(() => this.profile().education);
  readonly certifications = computed(() => this.profile().certifications);
  readonly data = this.profile;
}
