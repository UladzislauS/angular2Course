import {
	forwardRef,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
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

import { dateValidator } from '../validators/date.validator';

@Component({
	selector: 'date',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useValue: forwardRef(() => DateInputComponent),
			multi: true
		}
	],
	styles: [],
	templateUrl: '../tpl/date-input.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements ControlValueAccessor, Input, OnChanges {
	@Input() private _date: Date;
	@Input() private require: boolean;

	private propagateChange: Function;
	private propagateTouched: Function;
	private validateFunction: Function;

	constructor(private changeDetector: ChangeDetectorRef) {}

	public get date(): Date {
		return this._date;
	}

	public set date(date: Date) {
		this._date = date;
		this.propagateChange(this._date);
		this.propagateTouched(true);
	}

	public ngOnChanges() {
		this.validateFunction =  dateValidator(this.require);
	}

	public writeValue(value: Date) {
		if (value !== this._date) {
			this._date = value;
			this.changeDetector.markForCheck();
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
