import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'menu',
	styles: [ require('../styles/menu.styles.scss') ],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/menu.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {
	public menu = [{
		title: 'courses',
		url: '/courses'
	}];
}
