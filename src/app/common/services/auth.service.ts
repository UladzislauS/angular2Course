import {
	Injectable
} from '@angular/core';

import {
	Response
} from '@angular/http';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import {
	AuthorizedHttp
} from '../authorizedHttp';

import {
	User
} from '../entities';

@Injectable()
export class AuthService {
	private url = 'http://localhost:3001/users';
	private _user: User;
	private _userInfo: BehaviorSubject<string>;
	private _isAuthenticated: BehaviorSubject<boolean>;

	constructor(private http: AuthorizedHttp) {
		this._user = null;
		this._userInfo = new BehaviorSubject('');
		this._isAuthenticated = new BehaviorSubject(false);
	}

	public get userInfo(): BehaviorSubject<string> {
		return this._userInfo;
	}

	public get isAuthenticated(): Observable<boolean> {
		return this._isAuthenticated.asObservable();
	}

	public login(user: User): Observable<string> {
		const url = `${this.url}?login=${user.login}&password=${user.password}`;

		return this.http.get(url)
			.map((res: Response) => {
				const data = res.json();

				this._user = data && data.length ? new User(data[0].login, data[0].password) : null;
				this._userInfo.next(this._user ? this._user.login : null);
				this._isAuthenticated.next(!!this._user);
				sessionStorage['token'] = 'blabla';

				return this._userInfo.getValue();
			});
	}

	public logout(): Observable<string> {
		this._user = null;
		this._userInfo.next(null);
		this._isAuthenticated.next(false);
		sessionStorage['token'] = undefined;

		return this._userInfo.asObservable();
	}
}
