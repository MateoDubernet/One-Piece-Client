import { Component, OnInit } from '@angular/core';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { DataStateChangeEvent, EditEvent, GridDataResult, RemoveEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent implements OnInit {
  gridView: GridDataResult;
  crews: Crew[];

  selectedCrew: Crew;
  isNewCrew: boolean;

  state: State = {
    sort: [{ field: 'id', dir: 'asc' }],
    skip: 0,
    take: 21,
  };

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.initGridData();
  }

  viewMembersGrid(crew: Crew) {
    this.crewService.selectedCrew = crew;
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.crews, this.state);
  }

  addCrew() {
    this.selectedCrew = new Crew();
    this.isNewCrew = true;
  }

  editCrew(event: EditEvent) {
    this.selectedCrew = event.dataItem;
    this.isNewCrew = false;
  }

  saveCrew(crew: Crew) {
    if (this.isNewCrew) {
      this.crewService.postCrew(crew).subscribe({
        next: () => {
          this.initGridData();
        },
        error: error => {
          console.log(error);
        },
      });
    } else {
      this.crewService.updateCrew(crew).subscribe({
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

  deleteCrewGrid(event: RemoveEvent) {
    this.crewService.deleteCrew(event.dataItem.id).subscribe({
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
    this.selectedCrew = undefined;
  }

  private initGridData() {
    this.crewService.getCrews().subscribe({
      next: crews => {
        this.crews = crews;
        this.gridView = process(this.crews, this.state);
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
