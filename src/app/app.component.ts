import {Component, HostListener} from "@angular/core";
import {WindowSizeService} from "./shared/services/window.size.service";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent {

	constructor(protected windowSizeService: WindowSizeService) {}

	@HostListener("document:keyup", ["$event"])
	onKeyUpEvent(keyEvent: KeyboardEvent) {
		let noMetaKeys: boolean = keyEvent.altKey === false && keyEvent.ctrlKey === false && keyEvent.metaKey == false && keyEvent.repeat === false;
		let key: string = keyEvent.key.toLowerCase();

		if(noMetaKeys === true && key === "w") {
			// up
		} else if(noMetaKeys === true && key === "a") {
			// left
		} else if(noMetaKeys === true && key === "s") {
			// down
		} else if(noMetaKeys === true && key === "d") {
			// right
		}
	}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		this.windowSizeService.windowResize({height: event.target.innerHeight, width: event.target.innerWidth});
	}
}