import {
	Injectable
} from '@angular/core';
import {
	Http,
	Headers
} from '@angular/http';

@Injectable()
export class AuthorizedHttp {

	constructor(private http: Http) {}

	public get(url) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);

		return this.http.get(url, {headers});
	}

	public post(url, data) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);

		return this.http.post(url, data, {headers});
	}

	public delete(url) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);

		return this.http.delete(url, {headers});
	}

	private createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', 'Bearer ' + sessionStorage['token']);
	}
}
