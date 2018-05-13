import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class HeartbeatService {
	heartbeats: any[] = [];

	getEmitter(name: string): EventEmitter<string> {
		let heartbeat = this.heartbeats.find(heart => heart.name === name);
		return(heartbeat.emitter);
	}

	start(name: string, interval?: number): void {
		if(!interval) {
			interval = 1000;
		}
		let heartbeatEmitter = new EventEmitter<string>();
		let heartbeatId = window.setInterval(() => heartbeatEmitter.emit(name), interval);
		this.heartbeats.push({id: heartbeatId, name: name, emitter: heartbeatEmitter});
	}

	stop(name: string): void {
		let heartbeat = this.heartbeats.find(heart => heart.name === name);
		window.clearInterval(heartbeat.id);
		this.heartbeats = this.heartbeats.filter(heart => heart.id !== heartbeat.id);
	}
}