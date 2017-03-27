import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'app-footer',
	styles: [require('../styles/footer.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/footer.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {
	private _year = new Date().getFullYear();

	get year(): number {
		return this._year;
	}
}
