import { Component, OnInit } from '@angular/core';
import { Map } from '../model/map.model';

@Component({
  selector: 'app-one-piece',
  templateUrl: './one-piece.component.html',
  styleUrls: ['./one-piece.component.scss'],
})
export class OnePieceComponent implements OnInit {
  private rows: string[] = [];
  private columns: string[] = [];
  private active: boolean = false;
  private viewShipProperties: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const map = new Map([
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ]);
    this.rows = map.lengthBoard[0];
    this.columns = map.lengthBoard[1];

    map.lengthBoard.forEach(() => {});
  }

  get boardRows() {
    return this.rows;
  }

  get boardColumns() {
    return this.columns;
  }

  toggleClass() {
    if (this.active === false) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  viewShipPropertie() {
    if (this.viewShipProperties === false) {
      this.viewShipProperties = true;
    } else {
      this.viewShipProperties = false;
    }
  }

  get shipPropertie() {
    return this.viewShipProperties;
  }

  get activeClass() {
    return this.active;
  }
}
