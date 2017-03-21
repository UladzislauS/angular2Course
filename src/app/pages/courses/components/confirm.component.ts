import {
	EventEmitter,
	Component,
	ViewEncapsulation,
	Output,
	Input
} from '@angular/core';

@Component({
	selector: 'confirm',
	templateUrl: '../tpl/confirm.tpl.html',
	styles: [require('../styles/confirm.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent {
	@Input() public message: string;
	@Output() public confirmHandler = new EventEmitter<boolean>();
}
