import {RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";
import {BoardComponent} from "./board/board.component";
import {UserService} from "./shared/services/user.service";
import {APP_BASE_HREF} from "@angular/common";
import {WindowSizeService} from "./shared/services/window.size.service";


export const allAppComponents = [SplashComponent];

export const routes: Routes = [
	{path: "board", component: BoardComponent},
	{path: "", component: SplashComponent}
];

export const appRoutingProviders: any[] = [
	{provide: APP_BASE_HREF, useValue: window["_base_href"]},
	WindowSizeService
];

export const routing = RouterModule.forRoot(routes);