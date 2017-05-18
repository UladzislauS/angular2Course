import {
	Injectable
} from '@angular/core';

import {
	Response
} from '@angular/http';

import {
	Store
} from '@ngrx/store';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import {
	AuthorizedHttp
} from '../authorizedHttp';

import {
	User,
	UserInfo
} from '../entities';

import {
	LOG_IN,
	LOG_OUT,
	TOGGLE_SPINNER_OFF,
	TOGGLE_SPINNER_ON
} from '../reducers';

@Injectable()
export class AuthService {
	private url = 'http://localhost:3001/users';
	private user: User;
	private userInfo: Observable<UserInfo>;

	constructor(
		private http: AuthorizedHttp,
		private store: Store<UserInfo>
	) {
		this.user = null;
		this.userInfo = this.store.select('auth');
	}

	public login(user: User): Observable<boolean> {
		const url = `${this.url}?login=${user.login}&password=${user.password}`;

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		return this.http.get(url)
			.map((res: Response) => {
				const data = res.json();

				this.user = data && data.length ? new User(data[0].login, data[0].password) : null;
				if (this.user) {
					this.store.dispatch({
						type: LOG_IN,
						payload: new UserInfo(+data[0].id, this.user.login, true)
					});
					sessionStorage['token'] = 'blabla';
				}

				this.store.dispatch({
					type: TOGGLE_SPINNER_OFF
				});

				return !!this.user;
			});
	}

	public logout(): Observable<UserInfo> {
		this.user = null;
		this.store.dispatch({
			type: LOG_OUT
		});
		sessionStorage['token'] = undefined;

		return this.userInfo;
	}
}
