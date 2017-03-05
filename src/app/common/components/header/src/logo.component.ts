import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'logo',
	styles: [ require('../scss/logo.component.scss') ],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/logo.component.tpl.html'
})

export class LogoComponent {
	public logo = 'Logo';
}
