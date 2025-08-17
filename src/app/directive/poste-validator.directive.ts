import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[numberPosteValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PosteValidator, multi: true }],
})
export class PosteValidator implements Validator {
  @Input() numberPosteValidator!: number;

  public resLimitNbrPoste = { limitNbrPoste: true };
  public resForbiddenPoste = { forbiddenPoste: true };
  public resTwoCapitaine = { twoCapitaine: true };

  public selectMemberId!: number;
  public capitaine!: boolean;
  public compareControlValue!: number;
  public saveSelectItemName: string | null = null;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const choosenPoste = control.value?.join(', ');
    this.saveSelectedItemName(choosenPoste);

    const posteCapitaine = 'Capitaine';
    const posteSecond = 'Second';

    if (choosenPoste?.includes(posteCapitaine) && choosenPoste?.includes(posteSecond)) {
      return this.resForbiddenPoste;
    }

    if (control.value?.length > this.numberPosteValidator) {
      return this.resLimitNbrPoste;
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
