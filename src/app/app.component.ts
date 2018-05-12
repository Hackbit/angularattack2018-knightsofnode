import {Component, HostListener, OnInit} from "@angular/core";
import {WindowSizeService} from "./shared/services/window.size.service";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent implements OnInit {
	deviceWidth: number = null;

	constructor(protected windowSizeService: WindowSizeService) {}

	ngOnInit(): void {
		this.deviceWidth = window.innerWidth;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		this.windowSizeService.windowResize(event.target.innerHeight, event.target.innerWidth);

		// let newWidth = event.target.innerWidth;
		// if(this.deviceWidth !== null && (this.deviceWidth < this.SM_BREAKPOINT && newWidth >= this.SM_BREAKPOINT)) {
		// 	console.log("mobile -> desktop");
		// } else if (this.deviceWidth !== null && (this.deviceWidth >= this.SM_BREAKPOINT && newWidth < this.SM_BREAKPOINT)) {
		// 	console.log("desktop -> mobile");
		// }
		// this.deviceWidth = newWidth;
	}
}