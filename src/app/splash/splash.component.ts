import {Component, OnInit} from "@angular/core";
import {User} from "../shared/classes/user";
import {UserService} from "../shared/services/user.service";
import {WindowSizeService} from "../shared/services/window.size.service";

@Component({
	template: require("./splash.component.html")
})

export class SplashComponent implements OnInit{
	users: User[] = [];

	constructor(protected windowSizeService: WindowSizeService, protected userService: UserService) {}

	isMobile(): boolean {
		return(this.windowSizeService.isMobile());
	}

	ngOnInit():void {
		this.userService.getAllUsers()
			.subscribe(users => this.users = users);
	}

}