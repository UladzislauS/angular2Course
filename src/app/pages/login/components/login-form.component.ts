import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router }   from '@angular/router';

import { AuthService } from '../../../common/services';
import { User } from '../../../common/entities';

@Component({
	selector: 'login-form',
	templateUrl: '../tpl/login-form.tpl.html',
	styles: [require('../styles/login-form.styles.scss')],
	providers: [AuthService],
	encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {
	public name: string;
	public password: string;

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	public login() {
		this.authService.login( new User(this.name, this.password) );
		this.router.navigate(['/courses']);
	}
}
