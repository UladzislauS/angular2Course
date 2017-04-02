/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	NgZone
} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	templateUrl: './app.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

	constructor(private ngZone: NgZone) {
	}

	public ngOnInit() {
		this.ngZone.onUnstable.subscribe( () => console.time('Checking perf') );
		this.ngZone.onStable.subscribe( () => console.timeEnd('Checking perf') );
	}

}
