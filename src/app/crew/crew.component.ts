import { Component, OnInit } from '@angular/core';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { DataStateChangeEvent, EditEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { MembersService } from '../service/members.service';


@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {

  public crew?: Crew;
  public newCrew: boolean = false;
  public crewIndex!: number; 
  public crews: Crew[] = [];
  public filter!: CompositeFilterDescriptor;

  constructor(
    private memberService: MembersService,
    private crewService: CrewService, 
    private router: Router) {}

  ngOnInit(): void {
    this.crewService.setCrews();
  }

 get gridView(){
   return this.crewService.gridView;
 }

 get sort(){
   return this.crewService.sort;
 }

  public goTo(path: string){
    this.router.navigate([path])
  }

  public viewMembersGrid(crew: Crew){
    console.log(crew.members, 'CELL CLICK');
    this.crewService.selectedCrew = crew
  }

  public sortChange(sort:SortDescriptor[]):void{
    this.crewService.sort = sort;
    this.crewService.initDataGrid();
  }

  public filterChange(filter: CompositeFilterDescriptor):void{
    this.filter = filter;
    this.crewService.initDataGrid();
  }
 
  dataStateChange(state: DataStateChangeEvent): void{
    this.crewService.state = state;
    this.crewService.initDataGrid();
  }
  
  editCrewGrid(event: EditEvent ){
    this.newCrew = false;
    this.crew = event.dataItem;

    this.crewService.crews.forEach((crew)=>{ 
      if (this.crew?.id === crew.id) {
        this.crewIndex = this.crews.indexOf(crew)
      }
    })
  }

  editCrew(newCrew: Crew){
    this.crewService.setCrews();
    console.log('newcrew edit :', newCrew);
  }

  addCrewGrid(){
    this.crew = new Crew();
    this.newCrew = true;
  }

  addCrew (newCrew: Crew){
    this.crewService.setCrews();
    console.log(newCrew, 'newcrew save');
  }

  deleteCrewGrid(event: RemoveEvent ){

    console.log(event.dataItem, '1')

    this.memberService.deleteMember(event.dataItem.id).subscribe();
    this.crewService.deleteCrew(event.dataItem.id).subscribe();

    this.crewService.crews.splice(event.rowIndex, 1);
    this.crewService.initDataGrid();
  }

  closeForm(){
    this.crew = undefined;
  }
}
