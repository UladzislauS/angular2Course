import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import {
	ActivatedRoute,
	Router
} from '@angular/router';

import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';

import {
	Subscription
} from 'rxjs';

import {
	Store
} from '@ngrx/store';

import {
	CoursesService
} from '../../../common/services';

import {
	BreadcrumbsService
} from '../../../common/components';

import {
	Breadcrumb,
	CourseDetailed,
	UserInfo
} from '../../../common/entities';

import {
	durationValidator
} from '../validators/duration.validator';

import {
	dateValidator
} from '../validators/date.validator';

@Component({
	selector: 'course-edit',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/course-edit.styles.scss')],
	templateUrl: '../tpl/course-edit.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {
	public courseForm: FormGroup;

	private author: string;
	private id: number;
	private isNew: boolean;
	private subscription: Subscription;

	constructor(
		private breadcrumbsService: BreadcrumbsService,
		private coursesService: CoursesService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<UserInfo>
	) {
		this.courseForm = this.formBuilder.group({
			date: [ '', dateValidator(true) ],
			description: ['', [ Validators.required, Validators.maxLength(500) ] ],
			duration: ['0', durationValidator(true)],
			title: ['', [ Validators.required, Validators.maxLength(50) ] ]
		});

		this.subscription = this.store
			.select('auth')
			.subscribe((userInfo: UserInfo) => {
				this.author = userInfo.name;
			});
	}

	public ngOnInit() {
		const id = this.route.snapshot.params['id'];
		const params = id ?  ['/course-edit', { id } ] : ['/course-edit'];
		const title = id ?  `Course ${id || ''}` : 'New course';

		this.breadcrumbsService.setBreadcrumbs([
			new Breadcrumb('Courses', ['/courses/1']),
			new Breadcrumb(title, params)
		]);

		this.id = id || new Date().getTime();
		this.isNew = !id;

		if (!id) {
			return;
		}

		const subscription = this.coursesService
			.getCourse(id)
			.subscribe((course) => {
				this.courseForm.setValue({
					date: course.date.toLocaleDateString(),
					description: course.description,
					duration: `${course.duration}`,
					title: course.name
				});

				subscription.unsubscribe();
			});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	public cancel(): void {
		this.router.navigate(['/courses/1']);
	}

	public add(): void {
		const date = new Date( this.courseForm.get('date').value );
		const description = this.courseForm.get('description').value;
		const duration = +this.courseForm.get('duration').value;
		const title = this.courseForm.get('title').value;

		const newCourse = new CourseDetailed(this.id, title, description, duration, date, this.author, true);

		const subscribtion = (this.isNew
			? this.coursesService.addNewCourse(newCourse)
			: this.coursesService.updateCourse(this.id, newCourse))
			.subscribe((result) => {
				if (result.id) {
					subscribtion.unsubscribe();
					this.router.navigate(['/courses/1']);
				}
			});
	}
}
