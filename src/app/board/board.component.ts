import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {SpriteMovement} from "../shared/classes/sprite.movement"

@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    heroMovement = new SpriteMovement();

    npcArray = [];

    ngAfterViewInit() {
        var stage = new createjs.Stage("gameBoard");
        var circle = new character();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 10;
        circle.y = 10;
        stage.addChild(circle);

        stage.update();



        createjs.Ticker.setFPS(60);

        document.addEventListener('keypress', handlePress);
        function handlePress(event: KeyboardEvent) {
            console.log(event.keyCode)

            if(event.keyCode === 100)
            {
                circle.x = this.heroMovement.moveRight(circle.x);
            }
            if(event.keyCode === 97)
            {
                circle.x = this.heroMovement.moveLeft(circle.x);
            }
            if(event.keyCode === 115)
            {
                circle.y = this.heroMovement.moveUp(circle.y);
            }
            if(event.keyCode === 119)
            {
                circle.y = this.heroMovement.moveDown(circle.y);
            }
            stage.update();
        }
    }
}

class character extends createjs.Shape {
    health: number;
    attackPower: number;
}