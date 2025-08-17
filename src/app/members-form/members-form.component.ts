import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../service/members.service';
import { Member } from '../model/member.model';
import { Crew } from '../model/crew.model';
import { CrewService } from '../service/crews.service';

@Component({
  selector: 'app-members-form',
  templateUrl: './members-form.component.html',
  styleUrls: ['./members-form.component.scss'],
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
    name: new FormControl('', [Validators.required]),
    postes: new FormControl([], [Validators.required]),
    abilities: new FormControl([], [Validators.required]),
    bounty: new FormControl(0, [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    crew: new FormControl(''),
    weapons: new FormControl([]),
    crew_id: new FormControl(''),
  });

  @Input() set member(member: Member | undefined) {
    this.selectedMember = member;
    this.windowOpen = member != undefined;
    this.formMember.reset(member);
  }

  @Input() newMember: boolean = false;
  @Input() members!: Member[];
  @Input() selectedCrew!: Crew;

  @Output() edit = new EventEmitter<Member>();
  @Output() add = new EventEmitter<Member>();
  @Output() close = new EventEmitter<Member>();

  constructor(
    private crewService: CrewService,
    public memberService: MembersService
  ) {}

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
    this.windowOpen = false;
    this.close.emit();
  }

  saveForm() {
    const member: Member = this.formMember.value;
    member.poste = member.postes.join(', ');
    member.abilitie = member.abilities.join(', ');
    member.weapon = member.weapons.join(', ');

    if (this.newMember) {
      member.crew_id = this.selectedCrew.id;
      this.memberService.postMember(member).subscribe(newMember => {
        newMember.crew = this.selectedCrew.name;
        this.add.emit(newMember);
      });
    } else {
      this.memberService.updateMember(member).subscribe(newMember => {
        newMember.crew = this.selectedCrew.name;
        this.edit.emit(newMember);
      });
    }
    this.windowOpen = false;
  }
}
