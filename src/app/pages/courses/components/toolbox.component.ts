import {
	Component,
	EventEmitter,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	Output
} from '@angular/core';

@Component({
	selector: 'toolbox',
	templateUrl: '../tpl/toolbox.tpl.html',
	styles: [require('../styles/toolbox.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {
	public value: string;

	@Output() public findCourse = new EventEmitter<string>();

	public addCourse() {
		console.log('Nothing');
	}
}
