import {Component} from "@angular/core";
import {PlayerControlService} from "../shared/services/player.control.service";
import {WindowSizeService} from "../shared/services/window.size.service";
import {DOWN, LEFT, RIGHT, UP} from "../shared/services/player.control.service";

@Component({
	template: require("./splash.component.html")
})

export class SplashComponent {

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
		console.log("splash down");
	}

	left(): void {
		console.log("splash left");
	}

	right(): void {
		console.log("splash right");
	}

	up(): void {
		console.log("splash up");
	}

	isMobile(): boolean {
		return(this.windowSizeService.isMobile());
	}

	getWidth(): number {
		if(this.isMobile() === true) {
			return(Math.round(this.windowSizeService.getWindowSize().width * .9));
		} else {
			return(Math.round(this.windowSizeService.getWindowSize().width * .5));
		}
	}
}