import {
	EventEmitter,
	Component,
	ViewEncapsulation,
	Output,
	Input,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'confirm',
	templateUrl: '../tpl/confirm.tpl.html',
	styles: [require('../styles/confirm.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {
	@Input() public message: string;
	@Output() public confirmHandler = new EventEmitter<boolean>();
}
