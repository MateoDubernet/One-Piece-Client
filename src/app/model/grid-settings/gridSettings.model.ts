import { State } from '@progress/kendo-data-query';
import { ColumnSetting } from '../columnSetting.model';

export interface Settings {
  state: State;
  columns: ColumnSetting[];
}

export class GridSettings {
  id: string;
  saveName: string;
  createDate: Date;
  settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }
}
