import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Member } from '../model/member.model';
import { Crew } from '../model/crew.model';

@Directive({
    selector: '[nameValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: NameValidator, multi: true}]
})

export class NameValidator implements Validator{

    @Input('nameValidator') selectedItem!: Member[] | Crew[] | undefined
    
    public resUniqueName = {'uniqueName': true}
    
    public forbiddenName!: string;
    public compareControlValue!: number;
    public saveSelectItemName: string | null = null;

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {

        let selectItemName: string = control.value?.toLowerCase()

        this.saveSelectedItemName(selectItemName)
        
        console.log('DIRECTIVE RESPONSE', selectItemName, this.saveSelectItemName)
        
          this.selectedItem?.forEach((item)=> {
            if (selectItemName === item.name.toLowerCase()) {
              this.forbiddenName = item.name.toLowerCase()
            }
          });
        
          this.compareControlValue = selectItemName?.localeCompare(this.forbiddenName)

          if (this.compareControlValue === 0 && selectItemName !== this.saveSelectItemName) { 
            console.log('DIRECTIVE RESPONSE : CONDITION IS WORKING')
            return this.resUniqueName;
          }else{
            console.log('DIRECTIVE RESPONSE : IS NULL')
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
