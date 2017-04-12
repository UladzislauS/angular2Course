import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'spinner',
	styles: [require('../styles/spinner.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/spinner.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpinnerComponent implements OnInit, OnDestroy {
	public isSwitchedOn: boolean;

	private subscription: Subscription;

	constructor(private spinnerService: SpinnerService, private changeDetector: ChangeDetectorRef) {
		this.isSwitchedOn = false;
	}

	public ngOnInit() {
		this.subscription = this.spinnerService
			.getSwitchedStatus()
			.subscribe( (value: boolean) => {
				this.isSwitchedOn = value;
				this.changeDetector.markForCheck();
			});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
