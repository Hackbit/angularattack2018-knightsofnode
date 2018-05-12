import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {SpriteMovement} from "../shared/classes/sprite.movement"

@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    heroMovement = new SpriteMovement();
    gameBoard = new createjs.Stage("gameBoard");
    player = new actor();

    npcArray = [];

    ngAfterViewInit() {
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