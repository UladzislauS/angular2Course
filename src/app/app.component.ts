/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

import {
	Event,
	NavigationStart,
	Router
} from '@angular/router';

import { AuthService } from './common/services';
/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	templateUrl: './app.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
	private isAuth: boolean;

	constructor(
		private auth: AuthService,
		private router: Router
	) {
		auth.isAuthenticated.subscribe((isAuth: boolean) => {
			this.isAuth = isAuth;
		});

		router.events
			.filter((event: Event) => event instanceof NavigationStart)
			.subscribe((event: NavigationStart) => {
				if (!this.isAuth && event.url !== '/login') {
					this.router.navigate(['login']);
				}
			});
	}
}
