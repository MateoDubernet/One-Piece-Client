import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss'],
})
export class StateFormComponent {
  @Output() createState = new EventEmitter<string>();
  @Output() close = new EventEmitter<boolean>();

  windowOpen: boolean = false;
  gridStateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {}

  closeForm() {
    this.windowOpen = false;
    this.close.emit();
  }
}
