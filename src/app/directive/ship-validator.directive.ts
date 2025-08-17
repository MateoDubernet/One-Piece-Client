import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Crew } from '../model/crew.model';

@Directive({
  selector: '[shipValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ShipValidatorDirective, multi: true }],
})
export class ShipValidatorDirective implements Validator {
  @Input('shipValidator') selectedItem!: Crew[] | undefined;

  public resUniqueName = { uniqueShip: true };

  public forbiddenName!: string;
  public compareControlValue!: number;
  public saveSelectItemName: string | null = null;
  public saveSelectItemNameState: boolean = false;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const selectItemName: string = control.value?.toLowerCase();

    this.saveSelectedItemName(selectItemName);

    this.selectedItem?.forEach(item => {
      if (selectItemName === item.ship.toLowerCase()) {
        this.forbiddenName = item.ship.toLowerCase();
      }
    });

    this.compareControlValue = selectItemName?.localeCompare(this.forbiddenName);

    if (this.compareControlValue === 0 && selectItemName !== this.saveSelectItemName) {
      return this.resUniqueName;
    } else {
      return null;
    }
  }

  saveSelectedItemName(saveSelectItemName: string) {
    if (this.saveSelectItemName === null && saveSelectItemName !== undefined) {
      this.saveSelectItemName = saveSelectItemName;
    } else if (this.saveSelectItemName === null && saveSelectItemName === undefined) {
      this.saveSelectItemName = '';
    }
  }
}
