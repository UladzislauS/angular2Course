import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'menu',
	styles: [ require('../styles/menu.styles.scss') ],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/menu.tpl.html'
})

export class MenuComponent {
	public menu = [{
		title: 'courses',
		url: '/courses'
	}];
}
