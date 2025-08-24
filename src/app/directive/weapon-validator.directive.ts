import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[weaponsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WeaponsValidator, multi: true }],
})
export class WeaponsValidator implements Validator {
  @Input('weaponsValidator') limitNbrWeapons!: number;

  resForbiddenWeaponCombinaison = { forbiddenWeaponCombinaison: true };
  reslimitNbrWeapons = { limitNbrWeapons: true };

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const choosenWeapons = control.value?.join(', ');

    const weaponNone = 'None';

    if (choosenWeapons?.includes(weaponNone) && control.value.length > 1) {
      return this.resForbiddenWeaponCombinaison;
    }

    if (control.value?.length > this.limitNbrWeapons) {
      return this.reslimitNbrWeapons;
    } else {
      return null;
    }
  }
}
