import { Injectable } from '@angular/core';
import { Member } from '../model/member.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  public newPoste: string[] = [];
  public newAbilitie: string[] = [];
  public newWeapon: string[] = [];
  public allMembers: Member[] = [];
  public serverUrl = `${environment.api}/member`

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.serverUrl)
  }

  setMembers(){
    this.getMembers().subscribe((results)=>{
      this.allMembers = results
      this.allMembers.forEach((member)=>{
        member.postes = [];
        member.abilities = [];
        member.weapons = [];

        member.postes.push(member.poste);
        member.abilities.push(member.abilitie);
        member.weapons.push(member.weapon);
      });
      console.log('member received', this.allMembers)
    })
  }

  getMember(id: number): Observable<Member>{
    return this.http.get<Member>(`${this.serverUrl}/${id}`)
  }

  postMember(member: Member): Observable<Member>{
    return this.http.post<Member>(this.serverUrl, member)
  }

  updateMember(member: Member): Observable<Member>{
    return this.http.put<Member>(this.serverUrl, member)
  }

  deleteMember(id: number): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}/?id=${id}`)
  }

  public customPoste: string[] = [];
  public listOfPoste = [
    "Capitaine",
    "Second",
    "Navigatrice",
    "Medecin",
    "Cuistot",
    "Charpentier",
    "Historien",
    "Musicien",
    "Timonier",
    "Canonnier",
    "Vigie",
  ]

  public customAbilities: string[] = [];
  public listOfAbilities = [
    "Paramecia",
    "Zoan",
    "Logia",
    "Haki Armement",
    "Haki Observation",
    "Haki Royal",
    "Epeiste",
    "Tireur",
    "Cyborg",
    "Corp à corp"
  ]

  public customWeapon: string[] = [];
  public listOfWeapon = [
    "Sabres",
    "Bishento",
    "couteau",
    "Dague",
    "Longue Epée",
    "Epée",
    "hache",
    "Pistolet",
    "Fusil",
    "Canon",
    "lance pierre",
    "Baton",
    "Cyborg",
    "Kanabo",
    "Massue",
    "None"
  ]
//   listOfAbilities = [
//     {
//       text: "Fruit du démon",
//       id: 0,
//       items: [
//         {text: "Paramecia", id: 1},
//         {text: "Zoan", id: 2},
//         {text: "Logia", id: 3}
//       ]
//     },
//     {
//       text: "Haki",
//       id: 4,
//       items: [
//         {text: "Armement", id: 5},
//         {text: "Observation", id: 6},
//         {text: "Royal", id: 7}
//       ]
//     },
//     {text: "Epeiste", id: 8},
//     {text: "Tireur", id: 9},
//     {text: "Cyborg", id: 10},
//     {text: "Corp à corp", id: 11}
//   ]

//   listOfWeapon = [
//     {
//       text: "Arme Blanche",
//       id: 0,
//       items: [
//         {text: "Sabres", id: 1},
//         {text: "Bishento", id: 2},
//         {text: "couteau", id: 3},
//         {text: "Dague", id: 4},
//         {text: "Longue Epée", id: 5},
//         {text: "Epée", id: 6},
//         {text: "Faux", id: 7},
//         {text: "hache", id: 8}
//       ]
//     },
//     {
//       text: "Armes à feu",
//       id: 9,
//       items:[
//         {text: "Pistolet", id: 10},
//         {text: "Fusil", id: 11},
//         {text: "Canon", id: 12},
//       ]
//     },
//     {
//       text: "Autres",
//       id: 13,
//       items: [
//         {text: "lance pierre", id: 14},
//         {text: "Baton", id: 15},
//         {text: "Cyborg", id: 16},
//         {text: "Kanabo", id: 17},
//         {text: "Massue", id: 18}
//       ]
//     },
//     {text: "Aucune", id: 19 }
//   ]
}
