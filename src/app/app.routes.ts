import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {BoardComponent} from "./board/board.component";
import {SplashComponent} from "./splash/splash.component";
import {RulesComponent} from "./rules/rules.component";
import {WindowSizeService} from "./shared/services/window.size.service";
import {PlayerControlService} from "./shared/services/player.control.service";
import {HeartbeatService} from "./shared/services/heartbeat.service";
import {TeamComponent} from "./team/team.component";


export const allAppComponents = [BoardComponent, RulesComponent, SplashComponent, TeamComponent];

export const routes: Routes = [
	{path: "board", component: BoardComponent},
	{path: "rules", component: RulesComponent},
	{path: "team", component: TeamComponent},
	{path: "", component: SplashComponent}
];

export const appRoutingProviders: any[] = [
	{provide: APP_BASE_HREF, useValue: window["_base_href"]},
	HeartbeatService,
	PlayerControlService,
	WindowSizeService
];

export const routing = RouterModule.forRoot(routes);