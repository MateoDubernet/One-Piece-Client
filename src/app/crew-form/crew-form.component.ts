import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Crew } from '../model/crew.model';
import { CrewService } from '../service/crews.service';

@Component({
  selector: 'app-crew-form',
  templateUrl: './crew-form.component.html',
  styleUrls: ['./crew-form.component.scss'],
})
export class CrewFormComponent {
  public windowOpen: boolean = false;
  public selectedCrew!: Crew | undefined;

  public formCrew = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    ship: new FormControl('', [Validators.required]),
    members: new FormControl(''),
    memberMax: new FormControl(0, [Validators.required]),
  });

  @Output() edit = new EventEmitter<Crew>();
  @Output() add = new EventEmitter<Crew>();
  @Output() close = new EventEmitter<Crew>();

  @Input() set crew(crew: Crew | undefined) {
    this.selectedCrew = crew;
    this.windowOpen = crew != undefined;
    this.formCrew.reset(crew);
  }

  @Input() public newCrew: boolean = false;

  constructor(public crewService: CrewService) {}

  get crews() {
    return this.crewService.crews;
  }

  closeForm() {
    this.windowOpen = false;
    this.close.emit();
  }

  saveForm() {
    const crew: Crew = this.formCrew.value;

    if (this.newCrew) {
      crew.members = [];
      this.crewService.postCrew(crew).subscribe(crew => this.add.emit(crew));
    } else {
      if (this.selectedCrew?.members) {
        crew.members = this.selectedCrew.members;
      }
      this.crewService.updateCrew(crew).subscribe(update => this.edit.emit(update));
    }
    this.windowOpen = false;
  }
}
