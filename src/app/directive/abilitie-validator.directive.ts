import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[abilitiesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AbilitiesValidator, multi: true }],
})
export class AbilitiesValidator implements Validator {
  @Input('abilitiesValidator') limitNbrAbilities!: number;
  public resLimitNbrfruits = { limitNbrfruits: true };
  public resLimitNbrAbilities = { limitNbrAbilities: true };

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const choosenAbilities = control.value?.join(', ');

    const fruitZoan = 'Zoan';
    const fruitLogia = 'Logia';
    const fruitParamecia = 'Paramecia';
    const fruitShortName = 'no mi';

    if (choosenAbilities?.includes(fruitZoan) && choosenAbilities?.includes(fruitLogia)) {
      return this.resLimitNbrfruits;
    } else if (choosenAbilities?.includes(fruitZoan) && choosenAbilities?.includes(fruitParamecia)) {
      return this.resLimitNbrfruits;
    } else if (choosenAbilities?.includes(fruitLogia) && choosenAbilities?.includes(fruitParamecia)) {
      return this.resLimitNbrfruits;
    } else if (choosenAbilities?.includes(fruitZoan) && choosenAbilities?.includes(fruitShortName)) {
      return this.resLimitNbrfruits;
    } else if (choosenAbilities?.includes(fruitLogia) && choosenAbilities?.includes(fruitShortName)) {
      return this.resLimitNbrfruits;
    } else if (choosenAbilities?.includes(fruitParamecia) && choosenAbilities?.includes(fruitShortName)) {
      return this.resLimitNbrfruits;
    }

    if (control.value?.length > this.limitNbrAbilities) {
      return this.resLimitNbrAbilities;
    } else {
      return null;
    }
  }
}
