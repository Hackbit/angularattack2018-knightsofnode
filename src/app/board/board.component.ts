import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {WindowSizeService} from "../shared/services/window.size.service";
import {PlayerControlService} from "../shared/services/player.control.service";
import { LEFT, RIGHT, UP, DOWN } from "../shared/services/player.control.service";

const BOARD_MAX_X : number = 768;
const BOARD_MAX_Y : number = 432;
const X_GRID_POSITIONS : number = (BOARD_MAX_X/16) + 1;
const Y_GRID_POSITIONS : number = (BOARD_MAX_Y/16) + 1;

@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    gameBoard: createjs.Stage;
    player: actor;
    npcArray: Array<actor>;
    obstacleArray: Array<actor>;

    ngAfterViewInit() {
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

        this.player.graphics.beginFill("DeepSkyBlue").drawCircle(100, 256, 16);
        this.player.x = 10;
        this.player.y = 10;
        this.gameBoard.addChild(this.player);

        this.gameBoard.update();
        //console.log(this.gameBoard);

        createjs.Ticker.setFPS(60);

    }

	constructor(protected playerControlService: PlayerControlService, protected windowSizeService: WindowSizeService) {
		this.playerControlService.playerAction.subscribe((direction: string) => {
			switch(direction) {
				case DOWN:
					this.down();
					break;
				case LEFT:
					this.left();
					break;
				case RIGHT:
					this.right();
					break;
				case UP:
					this.up();
					break;
			}
		});
	}

	down(): void {
        // TODO - This is for NPC, replace with player control.
		this.HandleNpcMovement();
	}

	left(): void {
        this.player.x -= 16;
        this.gameBoard.update();
	}

	right(): void {
        this.player.x += 16;
        this.gameBoard.update();
	}

	up(): void {
        this.player.y -= 16;
        this.gameBoard.update();
	}

    HandleNpcMovement()
    {   
        var direction = GetNpcDirection(this.player.previousDirection);
        var boundaryCheck = BoundaryCheck(this.player);
        console.log(boundaryCheck )

        if(direction === 0 )
        {
            this.player.y += 16;
            this.player.previousDirection = direction;
        }
        if(direction === 1 )
        {
            this.player.x += 16;
        }
        if(direction === 2 )
        {
            this.player.y -= 16;
        }
        if(direction === 3 )
        {
            this.player.x -= 16;
        }           
    
        this.gameBoard.update();
    }
}

class actor extends createjs.Shape {
    health: number;
    attackPower: number;
    previousDirection: number;
}

function buildObstacleArray() : Array<actor> {
    let xPos : number = 384;
    let yPos : number = 208;
 
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
























function GetNpcDirection(previousDir : number) : number 
{
    let dirMin : number = 0;
    let dirMax : number = 4;
    let chngDirMin : number = 0;
    let chngDirMax : number = 7;

    var pdirection = Math.floor(Math.random() * (dirMax - dirMin)) + dirMin;
    var pChangeDir = Math.floor(Math.random() * (dirMax - dirMin)) + dirMin;

    if( pChangeDir === 2 || pChangeDir === 3 || pChangeDir === 4 || pChangeDir === 5 || pChangeDir === 6)
    {
        return previousDir;
    }
    else
    {
        return pdirection;
    }
}

function BoundaryCheck(_actor: actor): boolean
{
    console.log(_actor.x)
    console.log(_actor.y)
    if(_actor.x-16 <= 0)
    {
        return true;
    }
    if(_actor.x+16 >= BOARD_MAX_X)
    {
        return true;
    }
    if(_actor.y-16 <= 0)
    {
        return true;
    }
    if(_actor.x+16 >= BOARD_MAX_Y)
    {
        return true;
    }

    return false;
}
