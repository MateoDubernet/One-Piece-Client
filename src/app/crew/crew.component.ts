import { Component, OnInit, ViewChild } from '@angular/core';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { CellClickEvent, DataStateChangeEvent, EditEvent, GridComponent, RemoveEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { MembersService } from '../service/members.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent implements OnInit {
  @ViewChild('grid') set crewGrid(grid: GridComponent) {
    this._crewGrid = grid;
  }

  crew?: Crew;
  newCrew: boolean = false;
  crewIndex!: number;
  crews: Crew[] = [];
  filter!: CompositeFilterDescriptor;
  lastSelectDataItem!: Crew;
  _crewGrid: GridComponent;

  constructor(
    private memberService: MembersService,
    private crewService: CrewService
  ) {}

  get gridView() {
    return this.crewService.gridView;
  }

  get state() {
    return this.crewService.state;
  }

  set state(state: State) {
    this.crewService.state = state;
  }

  ngOnInit(): void {
    this.crewService.setCrews();
  }

  viewMembersGrid(crew: Crew) {
    this.crewService.selectedCrew = crew;
  }

  sortChange(sort: SortDescriptor[]): void {
    this.crewService.state.sort = sort;
    this.crewService.initDataGrid();
  }

  filterChange(filter: CompositeFilterDescriptor): void {
    this.crewService.state.filter = filter;
    this.crewService.initDataGrid();
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.crewService.state = state;
    this.crewService.initDataGrid();
  }

  editCrewGrid(event: EditEvent) {
    this.newCrew = false;
    this.crew = event.dataItem;

    this.crewService.crews.forEach(crew => {
      if (this.crew?.id === crew.id) {
        this.crewIndex = this.crews.indexOf(crew);
      }
    });
  }

  editCrew() {
    this.crewService.setCrews();
  }

  addCrewGrid() {
    this.crew = new Crew();
    this.newCrew = true;
  }

  addCrew() {
    this.crewService.setCrews();
  }

  deleteCrewGrid(event: RemoveEvent) {
    this.memberService.deleteMember(event.dataItem.id).subscribe();
    this.crewService.deleteCrew(event.dataItem.id).subscribe();

    this.crewService.crews.splice(event.rowIndex, 1);
    this.crewService.initDataGrid();
  }

  closeForm() {
    this.crew = undefined;
  }

  rowCallbackCounter = (context: RowClassArgs) => {
    return {
      selected: context.dataItem.compteur === this.lastSelectDataItem?.id,
    };
  };

  cellClickHandler(event: CellClickEvent) {
    this.lastSelectDataItem = event.dataItem;
  }
}
