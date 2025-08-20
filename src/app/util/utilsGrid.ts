import { State, SortDescriptor } from '@progress/kendo-data-query';

export class UtilsGrid {
  static readonly DEFAULT_SORT_DESCRIPTOR: SortDescriptor = { field: 'id', dir: 'desc' };
  static readonly DEFAULT_GRID_STATE: State = {
    skip: 0,
    take: 20,
    sort: [UtilsGrid.DEFAULT_SORT_DESCRIPTOR],
    filter: { logic: 'and', filters: [] },
  };

  public static setStateOfNearestPage(data: unknown[], state: State) {
    const nbData = data.length;
    // si la pagination actuelle dépasse le nombre d'éléments, on revient à la page précédente
    if (state.skip >= nbData) {
      const page = Math.floor(nbData / state.take);
      state.skip = page !== 0 ? state.take * (page - 1) : 0;
    }
  }
}
