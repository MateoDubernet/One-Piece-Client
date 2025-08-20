import { Settings } from './gridSettings.model';

export class GridSettingSave {
  id: string;
  saveName: string;
  gridName: string;
  settings: Settings;

  constructor(saveName: string, gridName: string, settings: Settings, id?: string) {
    this.saveName = saveName;
    this.gridName = gridName;
    this.settings = settings;
    this.id = id;
  }
}
