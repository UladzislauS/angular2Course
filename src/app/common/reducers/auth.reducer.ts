import {
	Action
} from '@ngrx/store';

import {
	UserInfo
} from '../entities';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function authReducer(state: UserInfo = new UserInfo(-1, '', false), action: Action) {
	switch (action.type) {
		case LOG_IN:
			return action.payload;
		case LOG_OUT:
			return new UserInfo(-1, '', false);
		default:
			return state;
	}
}
