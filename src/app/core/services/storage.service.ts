import { Service } from '@angular/core';

/** localStorage wrapper that never throws (private mode, blocked storage, etc.). */
@Service()
export class StorageService {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : (JSON.parse(raw) as T);
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — ignore
    }
  }
}
