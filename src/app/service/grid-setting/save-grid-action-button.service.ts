import { Injectable } from '@angular/core';
import { ActionButton } from '../../model/action-button.model';
import { gridSettingsActionButtons } from '../../save-grid/save-grid-action-button/save-grid-actions.enum';
import { GridSettingsService } from './gridSettings.service';

@Injectable({
  providedIn: 'root',
})
export class SaveGridActionButtonService {
  actionButtons: ActionButton<gridSettingsActionButtons>[];

  constructor(public gridSettingsService: GridSettingsService) {}

  initActionsButtons() {
    this.actionButtons = [];

    this.actionButtons = [
      {
        action: gridSettingsActionButtons.CREATE,
        label: 'Create',
        iconClass: 'fa fa-download',
        disabled: false,
      },
      {
        action: gridSettingsActionButtons.LOAD,
        label: 'Load',
        iconClass: 'fa fa-upload',
        disabled: false,
      },
      {
        action: gridSettingsActionButtons.SAVE,
        label: 'Save',
        iconClass: 'fa fa-floppy-o',
        disabled: this.isSaveButtonDisabled(),
      },
      {
        action: gridSettingsActionButtons.RESET,
        label: 'Reset',
        iconClass: 'fa fa-refresh',
        disabled: false,
      },
    ];
  }

  isSaveButtonDisabled(): boolean {
    return !this.gridSettingsService.currentGridSettings?.saveName;
  }
}
