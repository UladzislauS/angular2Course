import {
	Component,
	ViewEncapsulation,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';

import {
	Router
} from '@angular/router';

import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';

import { durationValidator } from '../validators/duration.validator';
import { dateValidator } from '../validators/date.validator';

@Component({
	selector: 'course-edit',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/course-edit.styles.scss')],
	templateUrl: '../tpl/course-edit.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent {
	public courseForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.courseForm = this.formBuilder.group({
			date: [ '', dateValidator(true) ],
			description: ['123', [ Validators.required, Validators.maxLength(500) ] ],
			duration: ['0', durationValidator(true)],
			title: ['123', [ Validators.required, Validators.maxLength(50) ] ]
		});
	}

	public cancel(): void {
		this.router.navigate(['/courses/1']);
	}

	public add(): void {
		this.router.navigate(['/courses/1']);
	}
}
