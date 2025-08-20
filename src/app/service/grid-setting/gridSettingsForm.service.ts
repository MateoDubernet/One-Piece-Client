import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GridSettingsService } from './gridSettings.service';

@Injectable({
  providedIn: 'root',
})
export class GridSettingsFormService {
  constructor(private gridSettingsService: GridSettingsService) {}

  public saveGridSettingsForm: FormGroup = new FormGroup({
    saveName: new FormControl('', [Validators.required, Validators.maxLength(100)], this.validateUniqueGridSaveName.bind(this)),
  });

  public isNewSave: boolean;

  validateUniqueGridSaveName(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.saveGridSettingsForm.get('saveName').value) {
      return this.gridSettingsService.gridSettings.find(gridSave => {
        if (this.isNewSave) {
          return gridSave.saveName === control.value;
        } else {
          return gridSave.saveName === control.value && gridSave.saveName !== this.gridSettingsService.currentGridSettings.saveName;
        }
      })
        ? of({ uniqueGridSaveName: true })
        : of(null);
    } else {
      return new Observable(subscriber => {
        subscriber.next(null);
      });
    }
  }
}
