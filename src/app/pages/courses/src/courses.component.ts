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
	Store
} from '@ngrx/store';

import {
	Breadcrumb,
	CourseDetailed,
	CoursesState
} from '../../../common/entities';

import {
	CoursesService
} from '../../../common/services';

import {
	BreadcrumbsService
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
	private paramsSubscription: Subscription;
	private storeSubscription: Subscription;

	constructor(
		private breadcrumbsService: BreadcrumbsService,
		private changeDetector: ChangeDetectorRef,
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<CoursesState>
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
			this.coursesService.removeCourse(this.removableCourseId);
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
		this.breadcrumbsService.setBreadcrumbs([
			new Breadcrumb('Courses', ['/courses/1'])
		]);

		this.paramsSubscription = Observable
			.combineLatest(this.route.params, this.route.queryParams, (params, queryParams) => ({params, queryParams}))
			.subscribe((params) => {
				this.currentPage = +params.params['page'];

				return this.coursesService.loadCourses(this.currentPage, params.queryParams['filter']);
			});

		this.paramsSubscription = this.store
			.select('courses')
			.subscribe((coursesState: CoursesState): void => {
				this.courses = coursesState.courses;
				this.coursesCount = coursesState.totalCount;
				this.changeDetector.markForCheck();
			});
	}

	public ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}
}
