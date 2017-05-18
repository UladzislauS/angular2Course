import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';

import {
	Router
} from '@angular/router';

import {
	Store
} from '@ngrx/store';

import {
	Observable,
	Subscription
} from 'rxjs';

import {
	UserInfo
} from '../../../entities';

import {
	AuthService
} from '../../../services';

@Component({
	selector: 'app-header',
	styles: [require('../styles/header.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/header.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {
	public userInfo: UserInfo;

	private subscription: Subscription;

	constructor(
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef,
		private router: Router,
		private store: Store<UserInfo>
	) {}

	public logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	public ngOnInit(): void {
		this.subscription = this.store
			.select('auth')
			.subscribe( (res: UserInfo): void => {
				this.userInfo = res;
				this.changeDetector.markForCheck();
			});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
