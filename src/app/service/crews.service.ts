import { Injectable } from '@angular/core';
import { Crew } from '../model/crew.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrewService extends BehaviorSubject<Crew[]> {
  serverUrl = `${environment.api}/crew`;
  selectedCrew = new Crew();
  crews: Crew[] = [];

  constructor(private http: HttpClient) {
    super([]);
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>(this.serverUrl);
  }

  postCrew(crew: Crew): Observable<Crew> {
    return this.http.post<Crew>(this.serverUrl, crew);
  }

  updateCrew(crew: Crew): Observable<Crew> {
    return this.http.put<Crew>(this.serverUrl, crew);
  }

  deleteCrew(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/${id} `);
  }
}
