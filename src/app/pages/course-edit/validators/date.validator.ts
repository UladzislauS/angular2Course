import {
	FormControl
} from '@angular/forms';

export function dateValidator(require) {
	return (formControl: FormControl) => {
		const REQUIRED_ERROR = 'Duration is required.';
		const PATTERN_ERROR = 'Date should be in "dd/MM/yyyy" format';
		const regExp = new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$');
		const error = {};

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
