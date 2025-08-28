import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Crew } from '../../model/crew.model';
import { CrewService } from '../../service/crews.service';

@Component({
  selector: 'app-crew-form',
  templateUrl: './crew-form.component.html',
  styleUrls: ['./crew-form.component.scss'],
})
export class CrewFormComponent {
  windowOpen: boolean = false;
  selectedCrew: Crew | undefined;
  formCrew = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    ship: new FormControl('', [Validators.required]),
    memberMax: new FormControl(0, [Validators.required]),
    numberOfMember: new FormControl(0),
  });

  @Output() saveFormEvent = new EventEmitter<Crew>();
  @Output() closeFormEvent = new EventEmitter<Crew>();

  @Input() crews: Crew[];
  @Input() set crew(crew: Crew | undefined) {
    this.selectedCrew = crew;
    this.windowOpen = crew != undefined;
    this.formCrew.reset(crew);
  }
  @Input() isNewCrew: boolean = false;

  constructor(public crewService: CrewService) {}

  saveForm() {
    this.formCrew.markAllAsTouched();
    if (!this.formCrew.valid) return;

    this.saveFormEvent.emit(this.formCrew.value);
  }

  closeForm() {
    this.closeFormEvent.emit();
  }
}
