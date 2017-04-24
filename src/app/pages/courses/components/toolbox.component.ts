import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';

import {
	ActivatedRoute,
	Params
} from '@angular/router';

import {
	Subscription
} from 'rxjs';

@Component({
	selector: 'toolbox',
	templateUrl: '../tpl/toolbox.tpl.html',
	styles: [require('../styles/toolbox.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit, OnDestroy {
	public value: string;

	@Output() public findCourse = new EventEmitter<string>();

	private subscription: Subscription;

	constructor(
		private route: ActivatedRoute
	) {}

	public ngOnInit() {
		this.subscription = this.route.queryParams.subscribe((params: Params) => {
			this.value = params['filter'];
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	public addCourse() {
		console.log('Nothing');
	}
}
