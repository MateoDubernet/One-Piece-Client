import { Component } from '@angular/core';
import { Crew } from './model/crew.model';
import { CrewService } from './service/crews.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private crewService: CrewService) {}

  resetSelectedCrew() {
    this.crewService.selectedCrew = new Crew();
  }
}
