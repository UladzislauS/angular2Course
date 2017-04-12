import {
	Component,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';

// entities
import { CourseDetailed } from '../../../common/entities';

// services
import {
	AuthService,
	CoursesService
} from '../../../common/services';
import { SpinnerService } from '../../../common/components';

// pipes
import { FilterPipe } from '../../../common/pipes';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [FilterPipe],
	styles: [require('../styles/courses.styles.scss')],
	templateUrl: '../tpl/courses.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	public confirmDeletePopup: boolean;
	public confirmMessage: string;
	public viewCourses: CourseDetailed[];

	private _courses: CourseDetailed[];
	private removableCourseId: number;
	private subscription: Subscription;

	constructor(
		private authService: AuthService,
		private coursesService: CoursesService,
		private spinnerService: SpinnerService,
		private filterPipe: FilterPipe,
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

	public findCourse(filter: string): void {
		this.viewCourses = this.filterPipe.transform(this._courses, 'name', filter);
	}

	public ngOnInit() {
		this.subscription = this.coursesService.courses.filter( (value) => {
				console.log(value);
				return true;
			} ).subscribe( (courses: CourseDetailed[]): void => {
			this._courses = courses;
			this.viewCourses = courses;
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
