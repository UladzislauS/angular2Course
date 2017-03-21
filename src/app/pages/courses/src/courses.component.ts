import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { CourseDetailed } from '../../../common/entities';
import {
	AuthService,
	CoursesService
} from '../../../common/services';

// temporary
@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [
		AuthService,
		CoursesService
	],
	styles: [require('../styles/courses.styles.scss')],
	templateUrl: '../tpl/courses.tpl.html'
})
export class CoursesComponent implements OnInit {
	public confirmDeletePopup: boolean;
	public confirmMessage: string;

	private _courses: CourseDetailed[];
	private removableCourseId: number;

	constructor(private authService: AuthService, private coursesService: CoursesService) {
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
			this.coursesService.removeCourse(this.removableCourseId);
		}
		this.removableCourseId = null;
		this.confirmDeletePopup = false;
	}

	public ngOnInit() {
		this._courses = this.coursesService.courses;
	}
}
