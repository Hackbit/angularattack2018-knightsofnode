import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class HeartbeatService {
	heartbeat: EventEmitter<any> = new EventEmitter<any>();
	intervalRunnerId: number = window.setInterval(() => this.heartbeat.emit("moar fuzzy"), 1000);

	stop(): void {
		window.clearInterval(this.intervalRunnerId);
	}
}