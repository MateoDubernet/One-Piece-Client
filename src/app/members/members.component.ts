import { Component, OnInit } from '@angular/core';
import { MembersService } from '../service/members.service';
import { Member } from '../model/member.model';
import { DataStateChangeEvent, EditEvent, GridDataResult, RemoveEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  gridView: GridDataResult;
  members: Member[];

  selectedMember: Member;
  isNewMember: boolean;

  crews: Crew[];
  crewsFilter: Crew[];
  selectedCrew: Crew;

  state: State = {
    sort: [{ field: 'id', dir: 'asc' }],
    skip: 0,
    take: 21,
  };

  constructor(
    private crewService: CrewService,
    private memberService: MembersService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.selectedCrew = this.crewService.selectedCrew;
    this.crewService.getCrews().subscribe({
      next: crews => {
        this.crews = crews;
        this.crewsFilter = this.crews.slice();
      },
      error: error => {
        console.log(error);
      },
    });

    if (this.selectedCrew.id) {
      this.initGridData();
    }
  }

  crewsFliter(value: string) {
    this.crewsFilter = [];
    this.crews.forEach(crew => {
      const filtercrews = crew.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      if (filtercrews) {
        this.crewsFilter.push(crew);
      }
    });
  }

  displaySelectedCrewMembers(crew: Crew) {
    if (crew !== undefined) {
      this.selectedCrew = crew;
      this.initGridData();
    } else {
      this.selectedCrew = new Crew();
      this.members = [];
      this.gridView = process(this.members, this.state);
    }
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.members, this.state);
  }

  addMember() {
    this.isNewMember = true;
    if (this.members.length === this.selectedCrew.memberMax) {
      this.maxMemberNotif();
    } else {
      this.selectedMember = new Member();
    }
  }

  editMember(event: EditEvent) {
    this.isNewMember = false;
    this.selectedMember = event.dataItem;
  }

  saveMember(member: Member) {
    if (this.isNewMember) {
      this.memberService.postMember(member).subscribe({
        next: () => {
          this.initGridData();
        },
        error: error => {
          console.log(error);
        },
      });
    } else {
      this.memberService.updateMember(member).subscribe({
        next: () => {
          this.initGridData();
        },
        error: error => {
          console.log(error);
        },
      });
    }

    this.closeForm();
  }

  deleteMember(event: RemoveEvent) {
    this.memberService.deleteMember(event.dataItem.id).subscribe({
      next: () => {
        this.initGridData();
      },
      error: error => {
        console.log(error);
      },
    });
    this.initGridData();
  }

  closeForm() {
    this.selectedMember = undefined;
  }

  private initGridData() {
    this.memberService.getMembersByCrewId(this.selectedCrew.id).subscribe({
      next: members => {
        this.members = members;
        this.gridView = process(this.members, this.state);
      },
      error: error => {
        console.log(error);
      },
    });
  }

  private maxMemberNotif() {
    const title = 'Edit Member';
    const content = 'You have reached the max members, click to close';
    const type = NotificationType.Error;
    const clickToClose = true;

    this.notifService.create(title, content, type, clickToClose);
  }
}
