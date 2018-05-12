import { Component, HostListener, AfterViewInit } from "@angular/core";
import * as createjs from 'createjs-module';
import {WindowSizeService} from "../shared/services/window.size.service";
import {PlayerControlService} from "../shared/services/player.control.service";
import { LEFT, RIGHT, UP, DOWN } from "../shared/services/player.control.service";

const BOARD_MAX_X : number = 768;
const BOARD_MAX_Y : number = 432;
const X_GRID_POSITIONS : number = (BOARD_MAX_X/16);
const Y_GRID_POSITIONS : number = (BOARD_MAX_Y/16);
const PLAYER_START_X: number = 0;
const PLAYER_START_Y: number = 0;


@Component({
    template: require("./board.component.html")
})

export class BoardComponent implements AfterViewInit {

    gameBoard: createjs.Stage;
    player: actor;
    npcArray: Array<actor> = [];
    obstacleArray: Array<actor> = [];

    ngAfterViewInit() {
        this.player = new actor();
        this.gameBoard = new createjs.Stage("gameBoard");
        let background = new createjs.Shape();
        background.graphics.beginFill("green").drawRect(0,0,768,432);
        this.gameBoard.addChild(background);

        this.buildObstacleArray();
        this.obstacleArray.forEach((obstacle) => {
            this.gameBoard.addChild(obstacle);
        });

        this.initializeNpcArray();
        this.npcArray.forEach((npc) => {
            this.gameBoard.addChild(npc);
        });
        console.log(this.npcArray);

        this.player.graphics.beginFill("DeepSkyBlue").drawRect(PLAYER_START_X, PLAYER_START_Y, 16, 16);
        this.player.x = PLAYER_START_X;
        this.player.currentX = PLAYER_START_X;
        this.player.y = PLAYER_START_Y;
        this.player.currentY =  PLAYER_START_Y;
        this.gameBoard.addChild(this.player);

        this.gameBoard.update();
        console.log(this.gameBoard);

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
        if(!BottomBoundaryCheck(this.player) && this.isMoveLegal(this.player.currentX, this.player.currentY + 16))
        {
            this.player.y += 16;
            this.player.currentY += 16;
            this.gameBoard.update();
        }
	}

	left(): void {
        if(!LeftBoundaryCheck(this.player) && this.isMoveLegal(this.player.currentX - 16, this.player.currentY))
        {
            this.player.x -= 16;
            this.player.currentX -=16;
            this.gameBoard.update();
        }
	}

	right(): void {
        if(!RightBoundaryCheck(this.player) && this.isMoveLegal(this.player.currentX + 16, this.player.currentY))
        {
            this.player.x += 16;
            this.player.currentX += 16;
            this.gameBoard.update();
        }
	}

	up(): void {
        if(!TopBoundaryCheck(this.player) && this.isMoveLegal(this.player.currentX, this.player.currentY - 16))
        {
            this.player.y -= 16;
            this.player.currentY -= 16;
            this.gameBoard.update();
        }
	}

    HandleNpcMovement()
    {   
        var direction = GetNpcDirection(this.player.previousDirection);

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
    
    initializeNpcArray() : void {
        let xPos : number;
        let yPos : number;
        //five for now; need to scale to difficulty later
        let isLegal : boolean;
        for (let i = 0; i < 5; i++) {
            let npc = new actor();
            let side = selectSide();
            isLegal = false;
            switch (side) {
                case 0:
                    do {
                        xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
                        yPos = 0;
                    } while (this.isMoveLegal(xPos, yPos) == false);
                    break;
                case 1:
                    do {
                        xPos = 0;
                        yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
                    } while (this.isMoveLegal(xPos, yPos) == false);
                    break;
                case 2:
                    do {
                        xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
                        yPos = BOARD_MAX_Y - 16;
                    } while (this.isMoveLegal(xPos, yPos) == false);
                    break;
                case 3:
                    do {
                        xPos = BOARD_MAX_X - 16;
                        yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
                    } while (this.isMoveLegal(xPos, yPos) == false);
                    break;
                default:
                    console.log("Well, you found a bug. Here's a kitty: =^-.-^=");
            }
            npc.currentX = xPos;
            npc.currentY = yPos;
            npc.graphics.beginFill("Black").drawRect(xPos, yPos, 16, 16);
            this.npcArray.push(npc);
        }
    }

    
    buildObstacleArray() : void {
        let xPos : number = 384;
        let yPos : number = 208;
    
        let obstacleArray = Array<actor>();
        for (let i = 0; i < 75; i++) {
            let obstacle = new actor();
            xPos = Math.floor(Math.random() * X_GRID_POSITIONS) * 16;
            yPos = Math.floor(Math.random() * Y_GRID_POSITIONS) * 16;
            obstacle.currentX = xPos;
            obstacle.currentY = yPos;
            obstacle.graphics.beginFill("Crimson").drawRect(xPos, yPos, 16, 16);
            this.obstacleArray.push(obstacle);
        }
    }

    isMoveLegal(xPos, yPos) : boolean {
        let value : boolean = true;
        this.obstacleArray.forEach((obstacle) => {
            if (obstacle.currentX === xPos && obstacle.currentY === yPos) {
                value = false;
            }
        });

        if (this.npcArray && this.npcArray.length > 0) {
            this.npcArray.forEach((npc) => {
                if (npc.currentX === xPos && npc.currentY === yPos) {
                    value = false;
                }
            });
        } 
        return value;
    }
}

class actor extends createjs.Shape {
    health: number;
    attackPower: number;
    previousDirection: number;
    currentX: number;
    currentY: number;
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

function LeftBoundaryCheck(_actor: actor): boolean
{
    var x = _actor.x-36;

    if((x<_actor.parent.x))
    {
        return true;
    }

    return false;
}

function RightBoundaryCheck(_actor: actor): boolean
{
    var x = _actor.x+24;
    var offsetXEdge = BOARD_MAX_X+_actor.parent.x;
    console.log(x);

    if(x>offsetXEdge)
    {
        return true;
    }

    return false;
}

function TopBoundaryCheck(_actor: actor): boolean
{
    var y = _actor.y-32;
    
    console.log(y);
    if(y<_actor.parent.y)
    {
        return true;
    }

    return false;
}

function BottomBoundaryCheck(_actor: actor): boolean
{
    var y = _actor.y+24;
    var offsetYEdge = BOARD_MAX_Y+_actor.parent.y;
    console.log(y);
    if(y>offsetYEdge)
    {
        return true;
    }

    return false;
}