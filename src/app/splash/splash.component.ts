import {Component} from "@angular/core";
import {faAngular, faJs, faReact} from "@fortawesome/free-brands-svg-icons";

@Component({
	template: require("./splash.component.html")
})

export class SplashComponent {
	faAngular = faAngular;
	faJs = faJs;
	faReact = faReact;
}