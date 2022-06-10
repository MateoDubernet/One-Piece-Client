import { Crew } from './crew.model';

export class Navire {
    private name!: string;
    private imgName!: string;
    private crew!: Crew;
    private position!: {x: number, y: number};
    private type!: string;

    constructor(name: string, equipage: Crew, position: {x: number, y: number}, type: string, imgUrl: string){
        this.name = name;
        this.crew = equipage;
        this.position = position;
        this.type = type;
        this.imgName = imgUrl;
    }

    get image(){
        return `/assets/image/${this.imgName}`;
    }

    get navirePosition(){
        return this.position
    }

    get navireName(){
        return this.name
    }

    set navirePosition({x, y}){
        this.position = {x, y}
    }

    // setPosition(xValue: number, yValue: number){
    //     let map = new Map([[0],[0]])

    //     if (
    //         xValue > map.positionX[0] &&
    //         xValue < map.positionX[1] &&

    //         yValue > map.positionY[0] &&
    //         yValue < map.positionY[1]
    //     ) {
    //         this.position.x = xValue;
    //         this.position.y = yValue;
    //     }

    //     this.position.x = xValue;
    //     this.position.y = yValue;
    // }

    // identity(){
    //     return `Le ${this.name} est un bateau de one piece`
    // }
}