import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';

import {
	ActivatedRoute,
	Params,
	Router
} from '@angular/router';

import {
	Observable,
	Subscription
} from 'rxjs';

import {
	CourseDetailed
} from '../../../common/entities';

import {
	AuthService,
	CoursesService
} from '../../../common/services';

import {
	SpinnerService
} from '../../../common/components';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	styles: [require('../styles/courses.styles.scss')],
	templateUrl: '../tpl/courses.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	public confirmDeletePopup: boolean;
	public confirmMessage: string;
	public courses: CourseDetailed[];
	public coursesCount: number;
	public currentPage: number;

	private removableCourseId: number;
	private subscription: Subscription;

	constructor(
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef,
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private spinnerService: SpinnerService
	) {
		this.courses = [];
		this.confirmDeletePopup = false;
		this.confirmMessage = 'Do you want to remove this course?';
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
		this.router.navigate(['/courses', 1], {
			queryParams: { filter: filter || undefined }
		});
	}

	public ngOnInit() {
		this.subscription = Observable
			.combineLatest(this.route.params, this.route.queryParams, (params, queryParams) => ({params, queryParams}))
			.switchMap((params) => {
				this.currentPage = +params.params['page'];
				this.spinnerService.toggle(true);

				return this.coursesService.getCourses(this.currentPage, params.queryParams['filter']);
			})
			.subscribe((courses: CourseDetailed[]): void => {
				this.courses = courses;
				this.coursesCount = this.coursesService.getTotalCount();
				this.changeDetector.markForCheck();
				this.spinnerService.toggle(false);
			});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
