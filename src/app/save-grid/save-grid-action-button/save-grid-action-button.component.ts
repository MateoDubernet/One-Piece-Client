import { Component, OnInit, Input } from '@angular/core';
import { gridSettingsActionButtons } from './save-grid-actions.enum';
import { SaveGridActionButtonService } from '../../service/grid-setting/save-grid-action-button.service';
import { GridSettingsService } from '../../service/grid-setting/gridSettings.service';
import { SaveGridComponent } from '../save-grid.component';

@Component({
  selector: 'app-save-grid-action-button',
  templateUrl: './save-grid-action-button.component.html',
  styleUrls: ['./save-grid-action-button.component.scss'],
})
export class SaveGridActionButtonComponent implements OnInit {
  @Input() saveGridComponent: SaveGridComponent;

  constructor(
    public saveGridActionButtonService: SaveGridActionButtonService,
    public gridSettingsService: GridSettingsService
  ) {}

  ngOnInit(): void {
    this.saveGridActionButtonService.initActionsButtons();
  }

  actionsButtonClick(action: gridSettingsActionButtons) {
    switch (action) {
      case gridSettingsActionButtons.CREATE:
        this.saveGridComponent.openSaveGridSettingsForm();
        break;

      case gridSettingsActionButtons.LOAD:
        this.saveGridComponent.openLoadGridSettingsWindow();
        break;

      case gridSettingsActionButtons.SAVE:
        if (!this.saveGridActionButtonService.isSaveButtonDisabled())
          this.saveGridComponent.openSaveGridSettingsForm(this.gridSettingsService.currentGridSettings);
        break;

      case gridSettingsActionButtons.RESET:
        this.saveGridComponent.resetLastLoadDate();
        break;

      default:
        console.error(`Unable to execute action, cause: unknown action type ${action}`);
        break;
    }
  }
}
