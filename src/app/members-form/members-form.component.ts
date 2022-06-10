import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { MembersService } from '../service/members.service';
import { Member } from '../model/member.model';
import { SaveEvent } from '@progress/kendo-angular-grid';
import { Crew } from '../model/crew.model';
import { CrewService } from '../service/crews.service';

@Component({
  selector: 'app-members-form',
  templateUrl: './members-form.component.html',
  styleUrls: ['./members-form.component.scss']
})

export class MembersFormComponent implements OnInit {
 
  public windowOpen: boolean = false;
  public selectedMember!: Member | undefined;
  private lastMemberId!: number;
  
  public listOfPosteFilter!: string[];
  public listOfWeaponFilter!: string[];
  public listOfAbilitiesFilter!: string[];

  public formMember = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    postes: new FormControl([], [Validators.required]),
    abilities: new FormControl([], [Validators.required]),
    bounty: new FormControl(0, [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    crew: new FormControl(''),
    weapons: new FormControl([]),
    crew_id: new FormControl(''),
  });

  @Input() set member(member: Member | undefined){
    console.log("member=",member);
    this.selectedMember = member;
    this.windowOpen = member != undefined;
    this.formMember.reset(member);
  }

  @Input() public newMember:boolean = false;
  @Input('crewMembers') public members!: Member[]
  @Input('selectedCrew') public selectedCrew!: Crew;
  
  @Output('edit') editEvent = new EventEmitter<Member>();
  @Output('add') addEvent = new EventEmitter<Member>();
  @Output('close') windowClose = new EventEmitter<Member>()


  constructor(private crewService: CrewService, public memberService: MembersService) {}

  ngOnInit(): void {
    
    this.listOfPosteFilter = this.memberService.listOfPoste.slice()
    this.listOfAbilitiesFilter = this.memberService.listOfAbilities.slice()
    this.listOfWeaponFilter = this.memberService.listOfWeapon.slice()

    console.log('log form edit member:', this.formMember.value)
  }

  posteFliter(value: string){
    this.listOfPosteFilter = []
    this.memberService.listOfPoste?.forEach((poste) => {
      let filterPoste = poste.toLowerCase().indexOf(value.toLowerCase()) !==-1;

      if (filterPoste) {
        this.listOfPosteFilter.push(poste)
      }
    });
  }

  weaponFliter(value: string){
    this.listOfWeaponFilter = []
    this.memberService.listOfWeapon?.forEach((weapon) => {
      let filterWeapon = weapon.toLowerCase().indexOf(value.toLowerCase()) !==-1;

      if (filterWeapon) {
        this.listOfWeaponFilter.push(weapon)
      }
    });
  }

  abilitiesFliter(value: string){
    this.listOfAbilitiesFilter = []
    this.memberService.listOfAbilities?.forEach((abilities) => {
      let filterAbilities = abilities.toLowerCase().indexOf(value.toLowerCase()) !==-1;

      if (filterAbilities) {
        this.listOfAbilitiesFilter.push(abilities)
      }
    });
  }

  addNewPoste(newPoste: string[]){
    this.memberService.customPoste = newPoste
  } 

  addNewAbilities(newAbilities: string[]){
    this.memberService.customAbilities = newAbilities
  }

  addNewWeapon(newWeapon: string[]){
    this.memberService.customWeapon = newWeapon
  }
  
  closeForm(){
    this.windowOpen = false;
    this.windowClose.emit() 
  }

  saveForm(event: SaveEvent){
    let member: Member = this.formMember.value;
    member.poste = member.postes.join(', ');
    member.abilitie = member.abilities.join(', ');
    member.weapon = member.weapons.join(', ');

     if(this.newMember){
        member.crew_id = this.selectedCrew.id
        this.memberService.postMember(member).subscribe(newMember =>{
            newMember.crew = this.selectedCrew.name 
            this.addEvent.emit(newMember)})
      }else{
        this.memberService.updateMember(member).subscribe(newMember => {
            newMember.crew = this.selectedCrew.name
            this.editEvent.emit(newMember)})
      }
      this.windowOpen = false;
  }
}
