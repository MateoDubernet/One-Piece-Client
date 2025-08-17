import { Injectable } from '@angular/core';
import { GridSetting } from '../model/gridSetting.model';

@Injectable({
  providedIn: 'root',
})
export class SaveGridStateService {
  savedStateExists!: boolean;

  constructor() {}

  get(token: string): JSON | string {
    const settings = localStorage.getItem(token);
    return settings ? JSON.parse(settings) : settings;
  }

  set(token: string, grid: GridSetting): void {
    localStorage.setItem(token, JSON.stringify(grid));
    if (!this.savedStateExists && localStorage.length > 0) {
      this.savedStateExists = true;
    }
  }

  remove(): void {
    localStorage.clear();
    if (localStorage.length === 0) {
      this.savedStateExists = false;
    }
  }

  getCircularReplacer() {
    const seen = new WeakSet();

    return (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return null;
        }
        seen.add(value);
      }

      return value;
    };
  }
}
