import { Injectable } from '@angular/core';
import { Crew } from '../model/crew.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MembersService } from './members.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  public selectedCrew: Crew = new Crew();
  public crews: Crew[] = [];
  public crewsFilter!: Crew[];
  public gridView!: GridDataResult;
  public state: State = {
    sort: [{ field: 'id', dir: 'asc' }],
    skip: 0,
    take: 5,
    filter: {
      logic: 'and',
      filters: [],
    },
  };

  public serverUrl = `${environment.api}/crew`;

  constructor(
    private http: HttpClient,
    private memberService: MembersService
  ) {
    this.setCrews();
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>(this.serverUrl);
  }

  setCrews() {
    this.memberService.setMembers();
    this.getCrews().subscribe(results => {
      results.forEach(result => {
        result.members = [];

        this.memberService.allMembers.forEach(member => {
          if (member.crew_id === result.id) {
            member.crew = result.name;
            result.members?.push(member);
          }
        });
      });

      this.crews = results;
      this.crewsFilter = this.crews.slice();
      this.initDataGrid();
    });
  }

  getCrew(id: number): Observable<Crew> {
    return this.http.get<Crew>(`${this.serverUrl}/${id}`);
  }

  postCrew(crew: Crew): Observable<Crew> {
    return this.http.post<Crew>(this.serverUrl, crew);
  }

  updateCrew(crew: Crew): Observable<Crew> {
    return this.http.put<Crew>(this.serverUrl, crew);
  }

  deleteCrew(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/?id=${id} `);
  }

  initDataGrid() {
    this.gridView = process(this.crews, this.state);
  }
}
