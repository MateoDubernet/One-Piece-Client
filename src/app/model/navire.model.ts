import { Crew } from './crew.model';

export class Navire {
  private name!: string;
  private imgName!: string;
  private crew!: Crew;
  private position!: { x: number; y: number };
  private type!: string;

  constructor(name: string, equipage: Crew, position: { x: number; y: number }, type: string, imgUrl: string) {
    this.name = name;
    this.crew = equipage;
    this.position = position;
    this.type = type;
    this.imgName = imgUrl;
  }

  get image() {
    return `/assets/image/${this.imgName}`;
  }

  get navirePosition() {
    return this.position;
  }

  get navireName() {
    return this.name;
  }

  set navirePosition({ x, y }) {
    this.position = { x, y };
  }
}
