import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Crew } from './model/crew.model';
import { CrewService } from './service/crews.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private crewService: CrewService){}

  public goTo(path: string){
    this.router.navigate([path])
    this.crewService.selectedCrew = new Crew()
  }
}
