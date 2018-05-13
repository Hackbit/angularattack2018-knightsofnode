import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {WindowSizeService} from "./shared/services/window.size.service";
import {PlayerControlService} from "./shared/services/player.control.service";
import {HeartbeatService} from "./shared/services/heartbeat.service";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent implements OnInit, OnDestroy {
	heartbeatName: string = "outtatime";

	constructor(protected heartbeatService: HeartbeatService, protected playerControlService: PlayerControlService, protected windowSizeService: WindowSizeService) {}

	@HostListener("document:keyup", ["$event"])
	onKeyUpEvent(keyEvent: KeyboardEvent) {
		let noMetaKeys: boolean = keyEvent.altKey === false && keyEvent.ctrlKey === false && keyEvent.metaKey == false && keyEvent.repeat === false;
		let key: string = keyEvent.key.toLowerCase();

		if(noMetaKeys === true && (key === "w" || key === "arrowup")) {
			this.playerControlService.up();
		} else if(noMetaKeys === true && (key === "a" || key === "arrowleft")) {
			this.playerControlService.left()
		} else if(noMetaKeys === true && (key === "s" || key === "arrowdown")) {
			this.playerControlService.down();
		} else if(noMetaKeys === true && (key === "d" || key === "arrowright")) {
			this.playerControlService.right();
		} else if(noMetaKeys === true && key === " ") {
			this.playerControlService.attack();
		}
	}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		this.windowSizeService.windowResize({height: event.target.innerHeight, width: event.target.innerWidth});
	}

	ngOnInit(): void {
		this.heartbeatService.start(this.heartbeatName);
	}

	ngOnDestroy(): void {
		this.heartbeatService.stop(this.heartbeatName);
	}
}