import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';

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

        document.addEventListener('keypress', function (event) {
            createjs.Tween.get(circle, { loop: false })
                .to({ x: circle.x + 10 }, 1000, createjs.Ease.getPowInOut(4))
            stage.update();
        });
    }

}
