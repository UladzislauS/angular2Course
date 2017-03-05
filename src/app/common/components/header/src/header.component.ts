import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'app-header',
	styles: [require('../scss/header.component.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/header.component.tpl.html'
})

export class HeaderComponent implements OnInit {
	public user = {
			name: 'user login'
	};

	private _isLoggedIn = false;

	get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	public toggleLogIn() {
		this._isLoggedIn = !this._isLoggedIn;
	}

	public ngOnInit() {
		this._isLoggedIn = true;
	}
}
