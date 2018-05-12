import {Component, HostListener} from "@angular/core";
import {WindowSizeService} from "./shared/services/window.size.service";
import {PlayerControlService} from "./shared/services/player.control.service";
import {HeartbeatService} from "./shared/services/heartbeat.service";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent {

	constructor(protected heartbeatService: HeartbeatService, protected playerControlService: PlayerControlService, protected windowSizeService: WindowSizeService) {}

	@HostListener("document:keyup", ["$event"])
	onKeyUpEvent(keyEvent: KeyboardEvent) {
		let noMetaKeys: boolean = keyEvent.altKey === false && keyEvent.ctrlKey === false && keyEvent.metaKey == false && keyEvent.repeat === false;
		let key: string = keyEvent.key.toLowerCase();

		if(noMetaKeys === true && key === "w") {
			this.playerControlService.up();
		} else if(noMetaKeys === true && key === "a") {
			this.playerControlService.left()
		} else if(noMetaKeys === true && key === "s") {
			this.playerControlService.down();
		} else if(noMetaKeys === true && key === "d") {
			this.playerControlService.right();
		}
	}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		this.windowSizeService.windowResize({height: event.target.innerHeight, width: event.target.innerWidth});
	}
}