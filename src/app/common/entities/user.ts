export  class User {
	constructor(
		private _login: string,
		private _password: string
	) {}

	get login(): string {
		return this._login;
	}

	set login(login: string) {
		this._login = login;
	}

	get password(): string {
		return this.password;
	}

	set password(password: string) {
		this._password = password;
	}
}
