import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Crew } from '../model/crew.model';

@Directive({
  selector: '[memberMaxValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MemberMaxValidatorDirective, multi: true }],
})
export class MemberMaxValidatorDirective implements Validator {
  @Input('memberMaxValidator') selectedCrew!: Crew;

  resLimitNbrMemberMax = { limitNbrMemberMax: true };
  selectMemberId!: number;
  forbiddenName!: string;
  compareControlValue!: number;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value < this.selectedCrew.members?.length) {
      return this.resLimitNbrMemberMax;
    } else {
      return null;
    }
  }
}
