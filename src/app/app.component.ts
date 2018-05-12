import {Component, HostListener, OnInit} from "@angular/core";

@Component({
	selector: "knights-of-node",
	template: require("./app.component.html")
})

export class AppComponent implements OnInit {
	deviceWidth: number = null;
	SM_BREAKPOINT: number = 768;

	isMobile(): boolean {
		return(this.deviceWidth < this.SM_BREAKPOINT);
	}

	ngOnInit(): void {
		this.deviceWidth = window.innerWidth;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event): void {
		let newWidth = event.target.innerWidth;
		if(this.deviceWidth !== null && (this.deviceWidth < this.SM_BREAKPOINT && newWidth >= this.SM_BREAKPOINT)) {
			console.log("mobile -> desktop");
		} else if (this.deviceWidth !== null && (this.deviceWidth >= this.SM_BREAKPOINT && newWidth < this.SM_BREAKPOINT)) {
			console.log("desktop -> mobile");
		}
		this.deviceWidth = newWidth;
	}
}