import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { AuthService } from '../../../services';

@Component({
	selector: 'app-header',
	providers: [AuthService],
	styles: [require('../styles/header.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/header.tpl.html'
})

export class HeaderComponent implements OnInit {
	private _userName: string;

	constructor(private authService: AuthService) {}

	public logout(): void {
		this.authService.logout();
	}

	public isLoggedIn(): boolean {
		return this.authService.isAuthenticated();
	}

	get userName(): string {
		return this._userName;
	}

	public ngOnInit(): void {
		this._userName = this.authService.getUserInfo();
	}
}
