import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {SpriteMovement} from "../shared/classes/sprite.movement"

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
    //needs to build objects, assign them a sprite, put them into the array
    //100 to start
    for (let i = 0; i < 100; i++) {
        let obstacle = new actor();
        xPos = Math.floor(Math.random() * 10) * 16;
        yPos = Math.floor(Math.random() * 10) * 16;
        obstacle.graphics.beginFill("Crimson").drawRect(xPos, yPos, 16, 16);
        obstacleArray.push(obstacle);
        console.log(obstacle);
    }
    return obstacleArray;
}