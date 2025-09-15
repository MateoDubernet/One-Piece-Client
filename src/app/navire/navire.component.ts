import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Navire } from '../model/navire.model';
import { CrewService } from '../service/crews.service';

@Component({
  selector: 'app-navire',
  templateUrl: './navire.component.html',
  styleUrls: ['./navire.component.scss'],
})
export class NavireComponent implements OnInit {
  @Input() ngClass!: string;

  @HostListener('window:keydown.ArrowRight')
  navireMoveRight() {
    if (this.position.x < 400 && this.ngClass === 'isSelected') {
      this.position.x = this.position.x + 100;
    }
  }
  @HostListener('window:keydown.ArrowLeft')
  navireMoveLeft() {
    if (this.position.x > 0 && this.ngClass === 'isSelected') {
      this.position.x = this.position.x - 100;
    }
  }
  @HostListener('window:keydown.ArrowUp')
  navireMoveUp() {
    if (this.position.y > 0 && this.ngClass === 'isSelected') {
      this.position.y = this.position.y - 100;
    }
  }
  @HostListener('window:keydown.ArrowDown')
  navireMoveDown() {
    if (this.position.y < 400 && this.ngClass === 'isSelected') {
      this.position.y = this.position.y + 100;
    }
  }

  private navire!: Navire;
  private position!: { x: number; y: number };

  constructor(private crewService: CrewService) {}

  get navirePositionTop() {
    return this.position.y;
  }

  get navirePositionLeft() {
    return this.position.x;
  }

  get navireSunny() {
    return this.navire;
  }

  ngOnInit(): void {
    this.navire = new Navire('Thousand Sunny', { x: 0, y: 0 }, 'sunny.jpg');
    this.position = this.navire.navirePosition;
  }
}
