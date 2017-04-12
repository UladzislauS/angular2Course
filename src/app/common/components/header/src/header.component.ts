import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';
import { AuthService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	styles: [require('../styles/header.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/header.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {
	private _userName: string;
	private _isAuth: boolean;
	private authSubscription: Subscription;
	private infoSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef
	) {}

	get userName(): string {
		return this._userName;
	}

	get isAuth(): boolean {
		return this._isAuth;
	}

	public logout(): void {
		this.authService.logout();
	}

	public ngOnInit(): void {
		this.authSubscription = this.authService.isAuthenticated.subscribe( (res: boolean): void => {
			this._isAuth = res;
			this.changeDetector.markForCheck();
		});
		this.infoSubscription = this.authService.userInfo.subscribe( (res: string): void => {
			this._userName = res;
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.authSubscription.unsubscribe();
		this.infoSubscription.unsubscribe();
	}
}
