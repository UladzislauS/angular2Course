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

import {
	Store
} from '@ngrx/store';

import {
	UserInfo
} from './common/entities';
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
		private router: Router,
		private store: Store<UserInfo>
	) {
		this.store.select('auth').subscribe((res: UserInfo) => {
			this.isAuth = res.isAuth;
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
