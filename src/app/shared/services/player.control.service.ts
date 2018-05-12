import {EventEmitter, Injectable} from "@angular/core";

export const ATTACK: string = "ATTACK";
export const DOWN: string = "DOWN";
export const LEFT: string = "LEFT";
export const RIGHT: string = "RIGHT";
export const UP: string = "UP";

@Injectable()
export class PlayerControlService {
	playerAction: EventEmitter<string> = new EventEmitter<string>();

	attack(): void {
		this.playerAction.emit(ATTACK);
	}

	down(): void {
		this.playerAction.emit(DOWN);
	}

	left(): void {
		this.playerAction.emit(LEFT);
	}

	right(): void {
		this.playerAction.emit(RIGHT);
	}

	up(): void {
		this.playerAction.emit(UP);
	}
}