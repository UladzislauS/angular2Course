import {
	forwardRef,
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	ViewEncapsulation
} from '@angular/core';

import {
	ControlValueAccessor,
	FormControl,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR
} from '@angular/forms';

import { durationValidator } from '../validators/duration.validator';

@Component({
	selector: 'duration',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DurationInputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useValue: forwardRef(() => DurationInputComponent),
			multi: true
		}
	],
	styles: [],
	templateUrl: '../tpl/duration-input.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent implements ControlValueAccessor, Input, OnChanges {
	@Input() private _duration: Date;
	@Input() private require: boolean;

	private propagateChange: Function;
	private propagateTouched: Function;
	private validateFunction: Function;

	public get duration(): Date {
		return this._duration;
	}

	public set duration(duration: Date) {
		this._duration = duration;
		this.propagateChange(this._duration);
		this.propagateTouched(true);
	}

	public ngOnChanges() {
		this.validateFunction =  durationValidator(this.require);
	}

	public writeValue(value: Date) {
		if (value) {
			this._duration = value;
		}
	}

	public registerOnChange(func: Function) {
		this.propagateChange = func;
	}

	public registerOnTouched(func: Function) {
		this.propagateTouched = func;
	}

	public validate(formControl: FormControl) {
		return this.validateFunction(formControl);
	}
}
