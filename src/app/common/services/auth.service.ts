import { Injectable } from '@angular/core';
import { User } from '../entities';

@Injectable()
export class AuthService {
	private _user: User;

	constructor() {
		let user = JSON.parse( localStorage.getItem('user') );
		this._user = user ? new User(user._login, user._password) : null;
		
	}

	public login(user: User): User {
		
		this._user = user;
		localStorage.setItem('user', JSON.stringify(user));

		return this._user;
	};

	public logout(): void {
		
		this._user = null;
		localStorage.removeItem('user');
	}

	public isAuthenticated(): boolean {
		return !!this._user;
	}

	public getUserInfo(): string {
		return this._user ? this._user.login : null;
	}
}
