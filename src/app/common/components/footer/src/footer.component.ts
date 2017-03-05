import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'app-footer',
	styles: [require('../scss/footer.component.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/footer.component.tpl.html'
})

export class FooterComponent {
	private _year = new Date().getFullYear();

	get year(): number {
		return this._year;
	}
}
