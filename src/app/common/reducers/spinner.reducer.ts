import {
	Action
} from '@ngrx/store';

export const TOGGLE_SPINNER_ON = 'TOGGLE_SPINNER_ON';
export const TOGGLE_SPINNER_OFF = 'TOGGLE_SPINNER_OFF';

export function spinnerReducer(state: boolean = false, action: Action) {
	switch (action.type) {
		case TOGGLE_SPINNER_ON:
			return true;
		case TOGGLE_SPINNER_OFF:
			return false;
		default:
			return false;
	}
}
