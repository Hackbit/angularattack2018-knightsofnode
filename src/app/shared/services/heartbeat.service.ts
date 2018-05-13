import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class HeartbeatService {
	heartbeats: any[] = [];
	heartbeat: EventEmitter<any> = new EventEmitter<any>();

	start(name: string): void {
		let heartbeatId = window.setInterval(() => this.heartbeat.emit(name));
		this.heartbeats.push({id: heartbeatId, name: name});
	}

	stop(name: string): void {
		let heartbeat = this.heartbeats.find(heart => heart.name === name);
		window.clearInterval(heartbeat.id);
		this.heartbeats = this.heartbeats.filter(heart => heart.id !== heartbeat.id);
	}
}