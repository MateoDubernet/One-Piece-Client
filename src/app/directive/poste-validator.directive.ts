import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Member } from "../model/member.model";

@Directive({
    selector: '[numberPosteValidator]' || '[namePosteValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: PosteValidator, multi: true}]
})

export class PosteValidator implements Validator{

    @Input('numberPosteValidator') limitPoste!: number;
    @Input('namePosteValidator') selectedMember!: Member[];

    public resLimitNbrPoste = {"limitNbrPoste" : true};
    public resForbiddenPoste = {"forbiddenPoste": true};
    public resTwoCapitaine = {"twoCapitaine": true};

    public selectMemberId!: number;
    public capitaine!: boolean;
    public compareControlValue!: number;
    public saveSelectItemName: string | null = null;

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {
        let choosenPoste = control.value?.join(', ');
        this.saveSelectedItemName(choosenPoste)
        console.log(this.limitPoste, 'DIRECTIVE POSTE');
        
        const posteCapitaine = 'Capitaine';
        const posteSecond = 'Second';
        
        if (choosenPoste?.includes(posteCapitaine) && choosenPoste?.includes(posteSecond)) {
            return this.resForbiddenPoste;
        }  
        
        // if (choosenPoste?.includes(posteCapitaine) && this.saveSelectItemName !== posteCapitaine) {
        //     return this.resTwoCapitaine
        // }

        if (control.value?.length > this.limitPoste) {
            return this.resLimitNbrPoste;
        }else{
            return null;
        }

    } 

    saveSelectedItemName(saveSelectItemName: string){
        if (this.saveSelectItemName === null && saveSelectItemName !== undefined) {
          this.saveSelectItemName = saveSelectItemName;
        }else if(this.saveSelectItemName === null && saveSelectItemName === undefined){
          this.saveSelectItemName = ''
        }
      }
}