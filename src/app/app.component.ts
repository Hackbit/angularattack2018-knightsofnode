import {Component, HostListener} from "@angular/core";
import {WindowSizeService} from "./shared/services/window.size.service";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent {

	constructor(protected windowSizeService: WindowSizeService) {}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		this.windowSizeService.windowResize({height: event.target.innerHeight, width: event.target.innerWidth});
	}
}