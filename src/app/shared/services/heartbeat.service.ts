import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class HeartbeatService {
	heartbeat: EventEmitter<string> = new EventEmitter<string>();
	intervalRunnerId: number = window.setInterval(() => this.heartbeat.emit("moar fuzzy"), 1000);
}