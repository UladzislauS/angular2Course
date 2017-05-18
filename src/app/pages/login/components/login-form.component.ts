import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import {
	Router
}   from '@angular/router';

import {
	AuthService
} from '../../../common/services';

import {
	User
} from '../../../common/entities';

@Component({
	selector: 'login-form',
	templateUrl: '../tpl/login-form.tpl.html',
	styles: [require('../styles/login-form.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
	public name: string;
	public password: string;
	public errorMessage: string;

	constructor(
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef,
		private router: Router
	) {}

	public ngOnInit() {
		this.name = '';
		this.password = '';
	}

	public login() {
		this.authService
			.login( new User(this.name, this.password) )
			.subscribe((result: boolean) => {
				if (result) {
					this.router.navigate(['/courses/1']);
				} else {
					this.errorMessage = !result ? 'Username or password is wrong' : null;
					this.changeDetector.markForCheck();
				}
			});
	}
}
