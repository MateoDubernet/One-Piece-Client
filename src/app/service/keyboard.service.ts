import { Injectable, EventEmitter } from '@angular/core';

export interface ClavierChangeEvent {
  node: unknown;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  public inputFocusEvent: EventEmitter<unknown> = new EventEmitter();
  public masquerEvent: EventEmitter<boolean> = new EventEmitter();

  public inputChange: EventEmitter<ClavierChangeEvent> = new EventEmitter<ClavierChangeEvent>();

  constructor() {}
}
