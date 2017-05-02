import {
	FormControl
} from '@angular/forms';

export function durationValidator(require) {
	return (formControl: FormControl) => {
		const REQUIRED_ERROR = 'Duration is required.';
		const PATTERN_ERROR = 'Duration should includes number value only.';
		const error = {};
		const regExp = new RegExp('^[0-9]+$');

		if (require && !formControl.value) {
			error['required'] = REQUIRED_ERROR;

			return error;
		}

		if (!regExp.test(formControl.value)) {
			error['pattern'] = PATTERN_ERROR;

			return error;
		}

		return null;
	};
}
