import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GridComponent, RowClassArgs, CellClickEvent, GridDataResult, RemoveEvent } from '@progress/kendo-angular-grid';
import { ColumnSetting } from '../model/columnSetting.model';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogRef, DialogCloseResult, DialogService } from '@progress/kendo-angular-dialog';
import { GridSettings } from '../model/grid-settings/gridSettings.model';
import { GridSettingsService } from '../service/grid-setting/gridSettings.service';
import { SaveGridActionButtonService } from '../service/grid-setting/save-grid-action-button.service';
import { GridSettingsFormService } from '../service/grid-setting/gridSettingsForm.service';
import { UtilsGrid } from '../util/utilsGrid';
import { GridSettingSave } from '../model/grid-settings/gridSettingsSave.model';

@Component({
  selector: 'app-save-grid',
  templateUrl: './save-grid.component.html',
  styleUrls: ['./save-grid.component.scss'],
})
export class SaveGridComponent implements OnInit, AfterViewInit {
  @Output() loadGrid: EventEmitter<State> = new EventEmitter();

  @Input() loadedGridComponent: GridComponent;
  @Input() gridComponentName: string;

  public gridView: Observable<GridDataResult>;
  public isFormOpen: boolean;
  public isLoadGridWindowOpen: boolean;
  public state: State = {
    skip: 0,
    take: 20,
    sort: [],
    filter: { logic: 'and', filters: [] },
  };
  public isNewSave: boolean;
  public savedGridName: string;

  private defaultGridComponentState: State;
  private defaultGridComponent: GridComponent;
  private defaultGridSettings: GridSettings;
  private lastSelectDataItem: GridSettings;
  private _gridComponentState: State;

  constructor(
    private gridSettingsService: GridSettingsService,
    private dialogService: DialogService,
    private saveGridActionButtonService: SaveGridActionButtonService,
    private gridSettingsFormService: GridSettingsFormService
  ) {}

  get gridComponentState() {
    return this._gridComponentState;
  }

  @Input() set gridComponentState(gridComponentState: State) {
    this._gridComponentState = gridComponentState;

    if (!this.defaultGridComponentState) {
      this.defaultGridComponentState = gridComponentState;
    }
  }

  ngOnInit(): void {
    this.getGridSettings();
    this.getLastLoadGridSettings();
  }

  ngAfterViewInit() {
    if (!this.defaultGridComponent) {
      this.defaultGridComponent = this.loadedGridComponent;
    }

    this.setDefaultGridSettings();
  }

  openSaveGridSettingsForm(savedGrid?: GridSettings) {
    this.gridSettingsFormService.saveGridSettingsForm.reset(savedGrid);

    this.gridSettingsFormService.isNewSave = !savedGrid;
    this.isFormOpen = true;
  }

  closeSaveGridSettingsForm() {
    this.isFormOpen = false;
  }

  saveGridSettings(savedGridName: string) {
    const columnsSettings = this.createGridColumnSettings(this.loadedGridComponent);
    const gridSettings = new GridSettingSave(savedGridName, this.gridComponentName, {
      state: this.gridComponentState,
      columns: columnsSettings,
    });

    if (!this.gridSettingsFormService.isNewSave) {
      gridSettings.id = this.gridSettingsService.currentGridSettings.id;
    }

    this.gridSettingsService.saveGridSettings(gridSettings, this.state).subscribe({
      next: gridSettings => {
        this.lastSelectDataItem = gridSettings;
        this.gridSettingsService.currentGridSettings = gridSettings;

        this.saveGridActionButtonService.initActionsButtons();
      },
      error: error => {
        console.log(error);
      },
    });
  }

  openLoadGridSettingsWindow() {
    this.isLoadGridWindowOpen = true;
  }

  closeLoadGridSettingsWindow() {
    this.isLoadGridWindowOpen = false;
  }

  loadGridSettings(gridSettings: GridSettings, isReset?: boolean) {
    const selectGrid = gridSettings;
    this.gridComponentState = selectGrid.settings.state;
    const gridColumns = this.loadedGridComponent.columnList.toArray();

    selectGrid.settings.columns.forEach(column => {
      const findColumn = gridColumns.find(gridColumn => gridColumn['field'] === column.field);

      if (findColumn) {
        findColumn['field'] = column.field;
        findColumn['hidden'] = column.hidden;
        findColumn['orderIndex'] = column.orderIndex;
        findColumn['locked'] = column.locked;
        findColumn['width'] = column.width;
      }
    });

    if (!isReset) {
      this.saveLastLoadDate(gridSettings);
    }

    this.gridSettingsService.currentGridSettings = gridSettings;
    this.loadGrid.emit(this.gridComponentState);
    this.saveGridActionButtonService.initActionsButtons();
    this.closeLoadGridSettingsWindow();
  }

  resetLastLoadDate() {
    this.gridSettingsService.resetLastLoadDate(this.gridComponentName).subscribe({
      next: () => {
        this.loadGridSettings(this.defaultGridSettings, true);
      },
      error: error => {
        console.log(error);
      },
    });
  }

  dataStateChange(state: State): void {
    this.state = state;
    this.gridSettingsService.read(this.gridComponentName);
  }

  rowCallbackCounter = (context: RowClassArgs) => {
    return {
      selected: context.dataItem.id === this.lastSelectDataItem?.id,
    };
  };

  cellClickHandler({ dataItem }: CellClickEvent) {
    this.lastSelectDataItem = dataItem;
  }

  showConfirmationForDelete({ dataItem }: RemoveEvent) {
    const gridSettingsId = dataItem.id;
    const dialog: DialogRef = this.dialogService.open({
      title: 'Confirm the deletion',
      content: 'Are you sure that you want to delete this record?',
      actions: [
        { text: 'Cancel', value: 'KO' },
        { text: 'Delete', value: 'OK', themeColor: 'primary' },
      ],
      width: 450,
      height: 155,
      minWidth: 250,
    });

    dialog.result.subscribe(result => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else if (result['value'] === 'OK') {
        this.deleteGridSettingsSave(gridSettingsId);
      }
    });
  }

  showConfirmationForSave(savedGridName: string) {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Confirm the update',
      content: 'Are you sure that you want to update this record ?',
      actions: [
        { text: 'Cancel', value: 'KO' },
        { text: 'Save', value: 'OK', themeColor: 'primary' },
      ],
      width: 450,
      height: 155,
      minWidth: 250,
    });

    dialog.result.subscribe(result => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else if (result['value'] === 'OK') {
        this.saveGridSettings(savedGridName);
      }
    });
  }

  private setDefaultGridSettings() {
    const columnsSettings = this.createGridColumnSettings(this.defaultGridComponent);
    this.defaultGridSettings = new GridSettings({ state: this.defaultGridComponentState, columns: columnsSettings });
  }

  private getLastLoadGridSettings() {
    this.gridSettingsService.getLastloadGridSettingsByName(this.gridComponentName).subscribe({
      next: data => {
        if (data) {
          this.loadGridSettings(data);
        } else {
          this.gridSettingsService.currentGridSettings = null;
        }

        this.saveGridActionButtonService.initActionsButtons();
      },
      error: error => {
        console.log(error);
      },
    });
  }

  private getGridSettings() {
    this.gridSettingsService.reset();

    this.gridView = this.gridSettingsService.pipe(
      map(settings => {
        settings.forEach(setting => {
          setting.createDate = new Date(setting.createDate);
        });

        return process(settings, this.state);
      })
    );

    this.gridSettingsService.read(this.gridComponentName);
  }

  private createGridColumnSettings(gridComponent: GridComponent): ColumnSetting[] {
    return gridComponent.columnList
      .toArray()
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map(column => {
        return <ColumnSetting>{
          field: column['field'],
          width: column['width'],
          locked: column['locked'],
          orderIndex: column['orderIndex'],
          hidden: column['hidden'],
        };
      });
  }

  private saveLastLoadDate(gridSettings: GridSettings) {
    this.gridSettingsService.saveLastLoadDate(gridSettings).subscribe({
      next: () => {},
      error: error => {
        console.log(error);
      },
    });
  }

  private deleteGridSettingsSave(gridSettingsId: string) {
    this.gridSettingsService.deleteGridSettings(gridSettingsId).subscribe({
      next: () => {
        UtilsGrid.setStateOfNearestPage(this.gridSettingsService.gridSettings, this.state);
        this.dataStateChange(this.state);

        if (this.gridSettingsService.currentGridSettings.id == gridSettingsId) {
          this.gridSettingsService.currentGridSettings = null;
          this.saveGridActionButtonService.initActionsButtons();
        }
      },
      error: () => {},
    });
  }
}
