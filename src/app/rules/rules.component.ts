import {Component} from "@angular/core";
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
	template: require("./rules.component.html")
})
export class RulesComponent {
	faArrowDown = faArrowDown;
	faArrowLeft = faArrowLeft;
	faArrowRight = faArrowRight;
	faArrowUp = faArrowUp;
}