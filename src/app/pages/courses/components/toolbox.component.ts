import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy
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

	public findCourse() {
		console.log(this.value);
	}

	public addCourse() {
		console.log('Nothing');
	}
}
