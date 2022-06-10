import { Component, OnInit } from '@angular/core';
import { MembersService } from '../service/members.service';
import { Member } from '../model/member.model';
import { DataStateChangeEvent, EditEvent, GridDataResult, RemoveEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, State, process } from '@progress/kendo-data-query';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-members',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss']
})
export class MembersComponent implements OnInit {

  public member?: Member;
  public memberIndex!: number;
  public allMemberIndex!: number;
  public newMember: boolean = false;

  public filter!: CompositeFilterDescriptor;
  public gridView!: GridDataResult;
  public selectedCrew!: Crew;
  public sort : SortDescriptor[] = [
    {
      field : 'id', dir : 'asc'
    }];
  public state: State = {
    sort: this.sort
  };

  constructor(
    private crewService: CrewService,
    private memberService: MembersService, 
    private notifService: NotificationsService) {}

  ngOnInit(): void {
    this.selectedCrew = this.crewService.selectedCrew;
    
    this.crewService.setCrews();
    this.initDataGrid()
  }

  set crewMembers(crewMembers: Member[]){}
  
  get crewMembers(){
    return this.selectedCrew.members
  }

  get crews(){
    return this.crewService.crews;
  }

  get crewsFilter(){
    return this.crewService.crewsFilter;
  }

  set crewsFilter(crewsFilter: Crew[]){}

  crewsFliter(value: string){
    this.crewsFilter = []
    this.crews?.forEach((crew) => {
      let filtercrews = crew.name.toLowerCase().indexOf(value.toLowerCase()) !==-1;

      if (filtercrews) {
        this.crewsFilter.push(crew)
      }
    });
  }

  displayCrewMembers(crew: Crew){
    console.log('return from grid', crew);

    if (crew !== undefined) {
      this.crewMembers = crew.members
      this.selectedCrew = crew
      this.initDataGrid();
    }else{
      this.crewMembers = []
      this.selectedCrew = new Crew()
      this.initDataGrid();
    }

    console.log('new members',this.crewMembers);
  }

  public sortChange(sort:SortDescriptor[]):void{
    this.sort = sort;
    this.initDataGrid();
  }

  public filterChange(filter: CompositeFilterDescriptor):void{
    this.filter = filter;
    this.initDataGrid();
  }

  initDataGrid(){
    this.gridView = process(this.selectedCrew.members, this.state)
  }
 
  dataStateChange(state: DataStateChangeEvent): void{   this.state = state;
    this.initDataGrid();
  }

  editMemberGrid( event: EditEvent ){
    this.newMember = false;
    this.member = event.dataItem;

    this.selectedCrew.members.forEach((member)=>{ 
      if (this.member?.id === member.id) {
        this.memberIndex = this.selectedCrew.members.indexOf(member);
        this.allMemberIndex = this.memberService.allMembers.indexOf(member);
      }
    })
  }

  editMember(newMember: Member){

    this.selectedCrew.members.splice(this.memberIndex, 1, newMember)
    this.initDataGrid();
  }

  addMemberGrid(){
    
    this.newMember = true;
    if (this.crewMembers.length === this.selectedCrew.memberMax) {
      this.member = undefined;
  
      const title = 'Edit Member';
      const content = 'You have reached the max members, click to close';
      const type = NotificationType.Error;
      const clickToClose = true
  
      this.notifService.create(title, content, type, clickToClose)
    }else{
      this.member = new Member();
    }
    console.log(this.crewMembers, this.selectedCrew);
  }

  addMember(newMember: Member){

      this.selectedCrew.members.push(newMember)
      this.initDataGrid();
  }

  deleteMemberGrid(event: RemoveEvent ){

    this.memberService.deleteMember(event.dataItem.id).subscribe();

    this.crewMembers.splice(event.rowIndex, 1);
    this.initDataGrid();

    console.log(event.dataItem)
    console.log(this.crewMembers)
  }

  closeForm(){
    this.member = undefined;
  }
}
