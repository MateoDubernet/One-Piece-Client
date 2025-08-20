import { Injectable } from '@angular/core';
import { GridSettings } from '../../model/grid-settings/gridSettings.model';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { GridSettingSave } from '../../model/grid-settings/gridSettingsSave.model';

@Injectable({
  providedIn: 'root',
})
export class GridSettingsService extends BehaviorSubject<GridSettings[]> {
  public gridSettings: GridSettings[] = [];
  public currentGridSettings: GridSettings;

  private url = `${environment.api}/grid-settings`;

  constructor(private http: HttpClient) {
    super([]);
  }

  getGridSettingsByName(gridName: string): Observable<GridSettings[]> {
    return this.http.get<GridSettings[]>(`${this.url}/name/${gridName}`);
  }

  getLastloadGridSettingsByName(gridName: string): Observable<GridSettings> {
    return this.http.get<GridSettings>(`${this.url}/name/${gridName}/last-load`);
  }

  saveGridSettings(gridSettings: GridSettingSave, state: State): Observable<GridSettings> {
    return this.http.post<GridSettings>(this.url, gridSettings).pipe(
      tap(gridSettings => {
        const index = this.gridSettings.findIndex(settings => settings.id === gridSettings.id);

        if (index >= 0) {
          this.gridSettings.splice(index, 1, gridSettings);
        } else {
          this.gridSettings.splice(state.skip, 0, gridSettings);
        }

        super.next(this.gridSettings);
      })
    );
  }

  saveLastLoadDate(gridSettings: GridSettings): Observable<void> {
    return this.http.post<void>(`${this.url}/${gridSettings.id}/last-load`, null);
  }

  resetLastLoadDate(gridName: string): Observable<void> {
    return this.http.post<void>(`${this.url}/name/${gridName}/last-load/reset`, null);
  }

  deleteGridSettings(gridSettingsId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${gridSettingsId}`).pipe(
      tap(() => {
        const index = this.gridSettings.findIndex(gridSettings => gridSettings.id === gridSettingsId);
        this.gridSettings.splice(index, 1);
        super.next(this.gridSettings);
      })
    );
  }

  read(gridName: string) {
    if (this.gridSettings.length) {
      return super.next(this.gridSettings);
    }
    this.fetch(gridName)
      .pipe(
        tap(data => {
          this.gridSettings = data;
        })
      )
      .subscribe(data => {
        super.next(data);
      });
  }

  fetch(gridName: string): Observable<GridSettings[]> {
    return this.getGridSettingsByName(gridName).pipe(map(res => res));
  }

  reset() {
    this.gridSettings = [];
  }
}
