import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveEvent } from '@progress/kendo-angular-grid';
import { Crew } from '../model/crew.model';
import { CrewService } from '../service/crews.service';
import { MembersService } from '../service/members.service';

@Component({
  selector: 'app-crew-form',
  templateUrl: './crew-form.component.html',
  styleUrls: ['./crew-form.component.scss']
})
export class CrewFormComponent implements OnInit {

  public windowOpen: boolean = false;
  public selectedCrew!: Crew | undefined;

  public formCrew = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    ship: new FormControl('', [Validators.required]),
    members: new FormControl(''),
    memberMax: new FormControl(0, [Validators.required]),
  });

  @Output('edit') editEvent = new EventEmitter<Crew>();
  @Output('add') addEvent = new EventEmitter<Crew>();
  @Output('close') windowClose = new EventEmitter<Crew>()

  @Input() set crew(crew: Crew | undefined){
    console.log("member=",crew);
    this.selectedCrew = crew;
    this.windowOpen = crew != undefined;
    this.formCrew.reset(crew);
  }

  @Input() public newCrew:boolean = false;

  constructor(public crewService: CrewService, private memberService: MembersService ) { }

  ngOnInit(): void {}

  get crews(){
    return this.crewService.crews
  }

  closeForm(){
    this.windowOpen = false;
    this.windowClose.emit() 
  }

  saveForm(event: SaveEvent){
    let crew: Crew = this.formCrew.value;
   // this.crews = this.crewService.crews;
    console.log('save crew');

     if(this.newCrew){
      crew.members = []
      this.crewService.postCrew(crew).subscribe(crew => this.addEvent.emit(crew));
     }else{
       if (this.selectedCrew?.members ) {
        crew.members = this.selectedCrew.members
       }
       this.crewService.updateCrew(crew).subscribe(update => this.editEvent.emit(update));
     }
     this.windowOpen = false;
  }
}
