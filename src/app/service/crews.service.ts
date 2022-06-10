import { Injectable } from '@angular/core';
import { Crew } from '../model/crew.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MembersService } from './members.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, State, process } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  public selectedCrew: Crew = new Crew();
  public crews: Crew[] = [];
  public crewsFilter!: Crew[];
  public gridView!: GridDataResult;
  public sort : SortDescriptor[] = [
    {
      field : 'id', dir : 'asc'
    }];
  public state: State = {
    sort: this.sort
  };
  public serverUrl = `${environment.api}/crew`

  constructor(private http: HttpClient, private memberService: MembersService) {
    this.setCrews();
  }

  getCrews(): Observable<Crew[]>{
    return this.http.get<Crew[]>(this.serverUrl)
  }

  setCrews(){
    this.memberService.setMembers(); 
    this.getCrews().subscribe((results)=>{  
      results.forEach((result)=>{
        result.members = [];

        this.memberService.allMembers.forEach((member)=>{
          if (member.crew_id === result.id) {
            member.crew = result.name;
            result.members?.push(member)
          }
        })
      })

      this.crews = results;
      this.crewsFilter = this.crews.slice();
      console.log('this.crewService.crews :', this.crews);
      this.initDataGrid();
    })  
  }

  getCrew(id: number): Observable<Crew>{
    return this.http.get<Crew>(`${this.serverUrl}/${id}`)
  }

  postCrew(crew: Crew): Observable<Crew>{
    console.log(crew, 'service crew post');
    return this.http.post<Crew>(this.serverUrl, crew)
  }

  updateCrew(crew: Crew): Observable<Crew>{
    return this.http.put<Crew>(this.serverUrl, crew)
  }

  deleteCrew(id: number): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}/?id=${id} `)
  }

  initDataGrid(){
    this.gridView = process(this.crews, this.state)
  }
}