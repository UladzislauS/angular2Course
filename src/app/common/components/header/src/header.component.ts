import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { AuthService } from '../../../services';

@Component({
	selector: 'app-header',
	styles: [require('../styles/header.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/header.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
	private _userName: string;
	private _isAuth: boolean;

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
		this.authService.isAuthenticated.subscribe( (res: boolean): void => {
			this._isAuth = res;
			this.changeDetector.markForCheck();
		});
		this.authService.userInfo.subscribe( (res: string): void => {
			this._userName = res;
			this.changeDetector.markForCheck();
		});
	}
}
