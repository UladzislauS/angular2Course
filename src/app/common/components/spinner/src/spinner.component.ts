import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ViewEncapsulation
} from '@angular/core';

import {
	Observable,
	Subscription
} from 'rxjs';

import {
	Store
} from '@ngrx/store';

@Component({
	selector: 'spinner',
	styles: [require('../styles/spinner.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/spinner.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpinnerComponent {
	public switch: Observable<boolean>;

	constructor(
		private store: Store<boolean>,
		private changeDetector: ChangeDetectorRef
	) {
		this.switch = this.store.select('spinner');
	}
}
