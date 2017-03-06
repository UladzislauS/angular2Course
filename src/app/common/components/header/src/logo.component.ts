import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'logo',
	styles: [ require('../styles/logo.styles.scss') ],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/logo.tpl.html'
})

export class LogoComponent {
	public logo = 'Logo';
}
