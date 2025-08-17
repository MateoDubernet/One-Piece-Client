import { Component, OnInit, ViewChild } from '@angular/core';
import { CrewService } from '../service/crews.service';
import { Crew } from '../model/crew.model';
import { CellClickEvent, DataStateChangeEvent, EditEvent, GridComponent, RemoveEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { MembersService } from '../service/members.service';
import { State } from '@progress/kendo-data-query';
import { SaveGridStateService } from '../service/saveGridState.service';
import { ColumnSetting } from '../model/columnSetting.model';
import { GridSetting } from '../model/gridSetting.model';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent implements OnInit {
  @ViewChild('grid') set crewGrid(grid: GridComponent) {
    this._crewGrid = grid;
  }

  public crew?: Crew;
  public newCrew: boolean = false;
  public crewIndex!: number;
  public crews: Crew[] = [];
  public filter!: CompositeFilterDescriptor;
  public lastSelectDataItem!: Crew;
  public _crewGrid: GridComponent;

  constructor(
    private memberService: MembersService,
    private crewService: CrewService,
    private router: Router,
    private saveGridStateService: SaveGridStateService
  ) {}

  ngOnInit(): void {
    this.crewService.setCrews();

    if (!this.savedStateExists && localStorage.length > 0) {
      this.savedStateExists = true;
    }
  }

  get gridView() {
    return this.crewService.gridView;
  }

  get savedStateExists() {
    return this.saveGridStateService.savedStateExists;
  }

  set savedStateExists(savedStateExist: boolean) {
    this.saveGridStateService.savedStateExists = savedStateExist;
  }

  get state() {
    return this.crewService.state;
  }

  set state(state: State) {
    this.crewService.state = state;
  }

  public goTo(path: string) {
    this.router.navigate([path]);
  }

  public viewMembersGrid(crew: Crew) {
    this.crewService.selectedCrew = crew;
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.crewService.state.sort = sort;
    this.crewService.initDataGrid();
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
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

  saveState(grid: GridComponent) {
    const columnsSettings: ColumnSetting[] = [];

    grid.columnList.toArray().forEach(column => {
      columnsSettings.push({
        field: column['field'],
        width: column['width'],
        locked: column['locked'],
        leafIndex: column['leafIndex'],
        hidden: column['hidden'],
      });
    });

    const gridSettings = {
      state: this.state,
      columns: columnsSettings,
    };

    this.saveGridStateService.set(`grid${localStorage.length}`, gridSettings);
  }

  loadState() {
    const gridSettings: GridSetting[] = [];

    const gridColumns = this._crewGrid.columnList.toArray();
    console.log(gridColumns);

    for (let i = 0; i < localStorage.length; i++) {
      gridSettings.push(this.saveGridStateService.get(`grid${i}`));
    }

    this.crewService.state = gridSettings[0].state;

    for (let i = 0; i < gridColumns.length; i++) {
      gridColumns[i]['field'] = gridSettings[0].columns[i].field;
      gridColumns[i]['hidden'] = gridSettings[0].columns[i].hidden;
      gridColumns[i]['leafIndex'] = gridSettings[0].columns[i].leafIndex;
      gridColumns[i]['locked'] = gridSettings[0].columns[i].locked;
      gridColumns[i]['width'] = gridSettings[0].columns[i].width;

      this._crewGrid.reorderColumn(gridColumns[i], gridColumns[i].leafIndex);
    }

    this.crewService.initDataGrid();
  }

  removeState() {
    for (let i = 0; i <= localStorage.length; i++) {
      this.saveGridStateService.remove(`grid${i}`);
    }
  }
}
