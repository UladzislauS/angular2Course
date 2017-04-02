import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
	selector: 'spinner',
	styles: [require('../styles/spinner.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/spinner.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpinnerComponent implements OnInit {
	public isSwitchedOn: boolean;

	constructor(private spinnerService: SpinnerService, private changeDetector: ChangeDetectorRef) {
		this.isSwitchedOn = false;
	}

	public ngOnInit() {
		this.spinnerService
			.getSwitchedStatus()
			.subscribe( (value: boolean) => {
				console.log('toggled');
				this.isSwitchedOn = value;
				this.changeDetector.markForCheck();
			});
	}
}
