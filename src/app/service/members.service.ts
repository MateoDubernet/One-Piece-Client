import { Injectable } from '@angular/core';
import { Member } from '../model/member.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  newPoste: string[] = [];
  newAbilitie: string[] = [];
  newWeapon: string[] = [];
  allMembers: Member[] = [];
  serverUrl = `${environment.api}/member`;

  customPoste: string[] = [];
  listOfPoste = [
    'Capitaine',
    'Second',
    'Navigatrice',
    'Medecin',
    'Cuistot',
    'Charpentier',
    'Historien',
    'Musicien',
    'Timonier',
    'Canonnier',
    'Vigie',
  ];

  customAbilities: string[] = [];
  listOfAbilities = [
    'Paramecia',
    'Zoan',
    'Logia',
    'Haki Armement',
    'Haki Observation',
    'Haki Royal',
    'Epeiste',
    'Tireur',
    'Cyborg',
    'Corp à corp',
  ];

  customWeapon: string[] = [];
  listOfWeapon = [
    'Sabres',
    'Bishento',
    'couteau',
    'Dague',
    'Longue Epée',
    'Epée',
    'hache',
    'Pistolet',
    'Fusil',
    'Canon',
    'lance pierre',
    'Baton',
    'Cyborg',
    'Kanabo',
    'Massue',
    'None',
  ];

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.serverUrl);
  }

  setMembers() {
    this.getMembers().subscribe(results => {
      this.allMembers = results;
      this.allMembers.forEach(member => {
        member.postes = [];
        member.abilities = [];
        member.weapons = [];

        member.postes.push(member.poste);
        member.abilities.push(member.abilitie);
        member.weapons.push(member.weapon);
      });
    });
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.serverUrl}/${id}`);
  }

  postMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.serverUrl, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(this.serverUrl, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/?id=${id}`);
  }
}
