import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'logo',
	styles: [ require('../styles/logo.styles.scss') ],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/logo.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogoComponent {
	public logo = 'Logo';
}
