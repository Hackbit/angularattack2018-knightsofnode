import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {SpriteMovement} from "../shared/classes/sprite.movement"

@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    ngAfterViewInit() {
        var stage = new createjs.Stage("gameBoard");
        var circle = new createjs.Shape();
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
                circle.x += 25;
            }
            if(event.keyCode === 97)
            {
                circle.x -= 25;
            }
            if(event.keyCode === 115)
            {
                circle.y += 25;
            }
            if(event.keyCode === 119)
            {
                circle.y -= 25;
            }
            stage.update();
        }
    }
}