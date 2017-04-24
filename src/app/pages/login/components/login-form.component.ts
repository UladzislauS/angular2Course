import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation
} from '@angular/core';

import { Router }   from '@angular/router';

import { AuthService } from '../../../common/services';
import { SpinnerService } from '../../../common/components/spinner';

import { User } from '../../../common/entities';

@Component({
	selector: 'login-form',
	templateUrl: '../tpl/login-form.tpl.html',
	styles: [require('../styles/login-form.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
	public name: string;
	public password: string;

	constructor(
		private authService: AuthService,
		private spinnerService: SpinnerService,
		private router: Router
	) {}

	public login() {
		this.spinnerService.toggle(true);
		this.authService
			.login( new User(this.name, this.password) )
			.subscribe(() => {
				this.spinnerService.toggle(false);
				this.router.navigate(['/courses/1']);
			});
	}
}
