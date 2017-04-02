import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
	private isSwitchedOn: BehaviorSubject<boolean>;

	constructor() {
		this.isSwitchedOn = new BehaviorSubject<boolean>(false);
	};

	public getSwitchedStatus(): Observable<boolean> {
		return this.isSwitchedOn.asObservable();
	};

	public toggle(value: boolean): Observable<boolean> {
		this.isSwitchedOn.next(value);

		return this.isSwitchedOn;
	};
}
