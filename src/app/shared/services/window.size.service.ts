import {EventEmitter, Injectable} from "@angular/core";
import {WindowSize} from "../classes/window.size";

@Injectable()
export class WindowSizeService {
	windowSize: WindowSize = {height: window.innerHeight, width: window.innerWidth};
	onWindowResize: EventEmitter<WindowSize> = new EventEmitter<WindowSize>();
	SM_BREAKPOINT: number = 768;

	isMobile(): boolean {
		return(this.windowSize.width < this.SM_BREAKPOINT);
	}

	getWindowSize(): WindowSize {
		return(this.windowSize);
	}

	windowResize(newWindowSize: WindowSize) {
		this.windowSize = newWindowSize;
		this.onWindowResize.emit(this.windowSize);
	}
}