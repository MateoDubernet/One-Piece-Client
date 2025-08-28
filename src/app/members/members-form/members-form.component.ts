import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../../service/members.service';
import { Member } from '../../model/member.model';
import { Crew } from '../../model/crew.model';

@Component({
  selector: 'app-members-form',
  templateUrl: './members-form.component.html',
  styleUrls: ['./members-form.component.scss'],
})
export class MembersFormComponent implements OnInit {
  windowOpen: boolean = false;
  selectedMember: Member | undefined;
  listOfPosteFilter: string[];
  listOfWeaponFilter: string[];
  listOfAbilitiesFilter: string[];

  formMember = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    stations: new FormControl([]),
    abilities: new FormControl([]),
    bounty: new FormControl(0),
    age: new FormControl(0, [Validators.required]),
    crew: new FormControl(''),
    weapons: new FormControl([]),
    crewId: new FormControl(''),
  });

  @Input() set member(member: Member | undefined) {
    this.selectedMember = member;
    this.windowOpen = member != undefined;
    this.formMember.reset(member);
  }

  @Input() newMember: boolean = false;
  @Input() members: Member[];
  @Input() selectedCrew!: Crew;

  @Output() save = new EventEmitter<Member>();
  @Output() close = new EventEmitter<Member>();

  constructor(public memberService: MembersService) {}

  ngOnInit(): void {
    this.listOfPosteFilter = this.memberService.listOfPoste.slice();
    this.listOfAbilitiesFilter = this.memberService.listOfAbilities.slice();
    this.listOfWeaponFilter = this.memberService.listOfWeapon.slice();
  }

  posteFliter(value: string) {
    this.listOfPosteFilter = [];
    this.memberService.listOfPoste?.forEach(poste => {
      const filterPoste = poste.toLowerCase().indexOf(value.toLowerCase()) !== -1;

      if (filterPoste) {
        this.listOfPosteFilter.push(poste);
      }
    });
  }

  weaponFliter(value: string) {
    this.listOfWeaponFilter = [];
    this.memberService.listOfWeapon?.forEach(weapon => {
      const filterWeapon = weapon.toLowerCase().indexOf(value.toLowerCase()) !== -1;

      if (filterWeapon) {
        this.listOfWeaponFilter.push(weapon);
      }
    });
  }

  abilitiesFliter(value: string) {
    this.listOfAbilitiesFilter = [];
    this.memberService.listOfAbilities?.forEach(abilities => {
      const filterAbilities = abilities.toLowerCase().indexOf(value.toLowerCase()) !== -1;

      if (filterAbilities) {
        this.listOfAbilitiesFilter.push(abilities);
      }
    });
  }

  addNewPoste(newPoste: string[]) {
    this.memberService.customPoste = newPoste;
  }

  addNewAbilities(newAbilities: string[]) {
    this.memberService.customAbilities = newAbilities;
  }

  addNewWeapon(newWeapon: string[]) {
    this.memberService.customWeapon = newWeapon;
  }

  closeForm() {
    this.close.emit();
  }

  saveForm() {
    const member = this.formMember.value;
    member.crewId = this.selectedCrew.id;
    this.save.emit(member);
  }
}
