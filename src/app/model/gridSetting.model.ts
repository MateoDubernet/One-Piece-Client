import { State } from '@progress/kendo-data-query';
import { ColumnSetting } from './columnSetting.model';

export class GridSetting {
  state: State;
  columns: ColumnSetting[] = [];
}
