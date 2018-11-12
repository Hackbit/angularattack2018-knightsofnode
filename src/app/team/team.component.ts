import {Component} from "@angular/core";
import {faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";

@Component({
	template: require("./team.component.html")
})
export class TeamComponent {
	faGithub = faGithub;
	faTwitter = faTwitter;
}