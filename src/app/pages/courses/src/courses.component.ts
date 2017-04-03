import {
	Component,
	ViewEncapsulation,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';

import { CourseDetailed } from '../../../common/entities';
import {
	AuthService,
	CoursesService
} from '../../../common/services';
import {
	SpinnerService
} from '../../../common/components';

// temporary
@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	styles: [require('../styles/courses.styles.scss')],
	templateUrl: '../tpl/courses.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
	public confirmDeletePopup: boolean;
	public confirmMessage: string;

	private _courses: CourseDetailed[];
	private removableCourseId: number;

	constructor(
		private authService: AuthService,
		private coursesService: CoursesService,
		private spinnerService: SpinnerService,
		private changeDetector: ChangeDetectorRef) {

		this._courses = [];
		this.confirmDeletePopup = false;
		this.confirmMessage = 'Do you want to remove this course?';
	}

	public get courses(): CourseDetailed[] {
		return this._courses;
	}

	public deleteCourse(id: number): void {
		this.confirmDeletePopup = true;
		this.removableCourseId = id;
	}

	public deleteConfirmHandler(value: boolean): void {
		if (value) {
			this.spinnerService.toggle(true);
			this.coursesService
				.removeCourse(this.removableCourseId)
				.subscribe(
					() => {},
					() => {},
					() => {
						this.spinnerService.toggle(false);
					});
		}
		this.removableCourseId = null;
		this.confirmDeletePopup = false;
	}

	public ngOnInit() {
		this.coursesService.courses.subscribe( (courses: CourseDetailed[]): void => {
			this._courses = courses;
			this.changeDetector.markForCheck();
		});
	}
}
