import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridSettingsFormService } from '../../service/gridSettingsForm.service';

@Component({
  selector: 'app-save-grid-form',
  templateUrl: './save-grid-form.component.html',
  styleUrls: ['./save-grid-form.component.scss']
})
export class SaveGridFormComponent implements OnInit {

  @Input() set isFormOpen(isFormOpen: boolean) {
    this.saveGridSettingsForm = this.gridSettingsFormService.saveGridSettingsForm;

    this.isNewSave = this.gridSettingsFormService.isNewSave;
    this._isFormOpen = isFormOpen;
  };

  @Output() save: EventEmitter<string> = new EventEmitter();
  @Output() saveNew: EventEmitter<string> = new EventEmitter();

  @Output() cancel: EventEmitter<Event> = new EventEmitter();

  public saveGridSettingsForm: FormGroup;
  public _isFormOpen: boolean;
  public isNewSave = false;

  constructor(private gridSettingsFormService: GridSettingsFormService) {}

  ngOnInit(): void {}

  saveForm() {
    this.saveGridSettingsForm.markAllAsTouched();
    if (!this.saveGridSettingsForm.valid) return;

    const gridName = this.saveGridSettingsForm.get('saveName').value;

    if (this.isNewSave) {
      this.saveNew.emit(gridName);
    } else {
      this.save.emit(gridName);
    }

    
    this.closeForm();
  }
  
  closeForm() {
    this.isFormOpen = false;
    this.cancel.emit();
  }
}
