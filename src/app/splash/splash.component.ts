import {Component, OnInit} from "@angular/core";
import {WindowSizeService} from "../shared/services/window.size.service";

@Component({
	template: require("./splash.component.html")
})

export class SplashComponent {

	constructor(protected windowSizeService: WindowSizeService) {}

	isMobile(): boolean {
		return(this.windowSizeService.isMobile());
	}
}