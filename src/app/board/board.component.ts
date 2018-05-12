import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {SpriteMovement} from "../shared/classes/sprite.movement"

const BOARD_MAX_X : number = 768;
const BOARD_MAX_Y : number = 432;
const X_GRID_POSITIONS : number = (BOARD_MAX_X/16) + 1;
const Y_GRID_POSITIONS : number = (BOARD_MAX_Y/16) + 1;

@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    heroMovement: SpriteMovement;
    gameBoard: createjs.Stage;
    player: actor;
    npcArray: Array<actor>;
    obstacleArray: Array<actor>;

    ngAfterViewInit() {
        this.heroMovement = new SpriteMovement();
        this.player = new actor();
        this.gameBoard = new createjs.Stage("gameBoard");
        let background = new createjs.Shape();
        background.graphics.beginFill("green").drawRect(0,0,768,432);
        this.gameBoard.addChild(background);

        this.obstacleArray = buildObstacleArray();
        this.obstacleArray.forEach((obstacle) => {
            this.gameBoard.addChild(obstacle);
        });

        this.npcArray = initializeNpcArray();
        this.npcArray.forEach((npc) => {
            this.gameBoard.addChild(npc);
        });

        this.player.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        this.player.x = 10;
        this.player.y = 10;
        this.gameBoard.addChild(this.player);

        this.gameBoard.update();

        createjs.Ticker.setFPS(60);

        document.addEventListener('keypress', handlePress);
        function handlePress(event: KeyboardEvent) {
            console.log(event.keyCode)

            if(event.keyCode === 100)
            {
                this.player.x = this.heroMovement.moveRight(this.player.x);
            }
            if(event.keyCode === 97)
            {
                this.player.x = this.heroMovement.moveLeft(this.player.x);
            }
            if(event.keyCode === 115)
            {
                this.player.y = this.heroMovement.moveUp(this.player.y);
            }
            if(event.keyCode === 119)
            {
                this.player.y = this.heroMovement.moveDown(this.player.y);
            }
            this.gameBoard.update();
        }
    }
}

class actor extends createjs.Shape {
    health: number;
    attackPower: number;
}

function buildObstacleArray() : Array<actor> {
    let xPos : number;
    let yPos : number;

    let obstacleArray = Array<actor>();
    for (let i = 0; i < 75; i++) {
        let obstacle = new actor();
        xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
        yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
        obstacle.graphics.beginFill("Crimson").drawRect(xPos, yPos, 16, 16);
        obstacleArray.push(obstacle);
    }
    return obstacleArray;
}

function initializeNpcArray() : Array<actor> {
    let xPos : number;
    let yPos : number;
    let npcArray = Array<actor>();
    //five for now; need to scale to difficulty later
    for (let i = 0; i < 5; i++) {
        let npc = new actor();
        let side = selectSide();
        switch (side) {
            case 0:
                xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
                yPos = 0;
                break;
            case 1:
                xPos = 0;
                yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
                break;
            case 2:
                xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
                yPos = BOARD_MAX_Y - 16;
                break;
            case 3:
                xPos = BOARD_MAX_X - 16;
                yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
                break;
            default:
                console.log("Well, you found a bug. Here's a kitty: =^-.-^=");
        }
        npc.graphics.beginFill("Black").drawRect(xPos, yPos, 16, 16);
        npcArray.push(npc);
    }
    return npcArray;
}

function selectSide() : number {
    let side : number = Math.floor(Math.random() * 4);
    return side;
}