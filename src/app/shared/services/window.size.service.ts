import {EventEmitter, Injectable} from "@angular/core";
import {WindowSize} from "../classes/window.size";

@Injectable()
export class WindowSizeService {
	windowSize: WindowSize = {height: 0, width: 0};
	onWindowResize: EventEmitter<WindowSize> = new EventEmitter<WindowSize>();
	SM_BREAKPOINT: number = 768;

	isMobile(): boolean {
		return(this.windowSize.width < this.SM_BREAKPOINT);
	}

	getWindowSize(): WindowSize {
		return(this.windowSize);
	}

	windowResize(newHeight: number, newWidth: number) {
		this.onWindowResize.emit({height: newHeight, width: newWidth});
	}
}