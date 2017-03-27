import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../entities';

@Injectable()
export class AuthService {
	private _user: User;
	private _userInfo: BehaviorSubject<string>;
	private _isAuthenticated: BehaviorSubject<boolean>;

	public get userInfo(): Observable<string> {
		return this._userInfo.asObservable();
	}

	public get isAuthenticated(): Observable<boolean> {
		return this._isAuthenticated.asObservable();
	}

	constructor() {
		let user = JSON.parse( localStorage.getItem('user') );
		if (user) {
			this._user = new User(user._login, user._password);
			this._userInfo = new BehaviorSubject(user._login);
			this._isAuthenticated = new BehaviorSubject(true);
		} else {
			this._user = null;
			this._userInfo = new BehaviorSubject(null);
			this._isAuthenticated = new BehaviorSubject(false);
		}
	}

	public login(user: User): Observable<string> {
		this._user = user;
		this._userInfo.next(user.login);
		this._isAuthenticated.next(true);
		localStorage.setItem('user', JSON.stringify(user));

		return this._userInfo.asObservable();
	};

	public logout(): Observable<string> {
		this._user = null;
		this._userInfo.next(null);
		this._isAuthenticated.next(false);
		localStorage.removeItem('user');

		return this._userInfo.asObservable();
	}
}
