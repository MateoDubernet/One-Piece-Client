export class Navire {
  private name: string;
  private imgName: string;
  private position: { x: number; y: number };

  constructor(name: string, position: { x: number; y: number }, imgUrl: string) {
    this.name = name;
    this.position = position;
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
