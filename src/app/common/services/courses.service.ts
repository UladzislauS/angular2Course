import {
	Injectable
} from '@angular/core';

import {
	Response
} from '@angular/http';

import {
	Store
} from '@ngrx/store';

import {
	Observable,
	BehaviorSubject,
	Subject
} from 'rxjs';

import {
	AuthorizedHttp
} from '../authorizedHttp';

import {
	CoursesState,
	CourseDetailed
} from '../entities';

import {
	LOAD_COURSES,
	EDIT_COURSE,
	TOGGLE_SPINNER_OFF,
	TOGGLE_SPINNER_ON
} from '../reducers';

@Injectable()
export class CoursesService {
	private url = 'http://localhost:3001/courses';

	constructor(
		private http: AuthorizedHttp,
		private store: Store<CourseDetailed[]>
	) {}

	public loadCourses(page: number, filter: string): void {
		const url = `${this.url}?name_like=${filter || ''}&_page=${page}&_limit=${10}`;

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		const subscription = this.http
			.get(url)
			.subscribe((response: Response): void => {
				const data = response.json();
				const totalCount = +response.headers.get('X-Total-Count');
				const courses = data.map((node) => {
					return new CourseDetailed(node.id, node.name, node.description, node.duration, node.date,
						node.author, node.isTopRated);
				});

				this.store.dispatch({
					type: LOAD_COURSES,
					payload: new CoursesState(page, filter, totalCount, courses)
				});

				this.store.dispatch({
					type: TOGGLE_SPINNER_OFF
				});

				subscription.unsubscribe();
			});
	}

	public getCourse(id: number): Observable<CourseDetailed> {
		const url = `${this.url}?id=${id}`;

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		return this.http
			.get(url)
			.map((response: Response): CourseDetailed => {
				const data = response.json();
				const courses = data.map((node) => {
					return new CourseDetailed(node.id, node.name, node.description, node.duration, new Date(node.date),
						node.author, node.isTopRated);
				});

				this.store.dispatch({
					type: TOGGLE_SPINNER_OFF
				});

				return courses[0];
			});
	}

	public addNewCourse(course: CourseDetailed): Subject<CourseDetailed> {
		const response: Subject<CourseDetailed> = new Subject();

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		const subscription = this.http
			.post(this.url, course)
			.subscribe((responseData: Response): void => {
				const data = responseData.json();

				let addedCourse = null;

				if (data.id) {
					addedCourse = new CourseDetailed(data.id, data.name, data.description, data.duration,
						new Date(data.date), data.author, data.isTopRated);
				}

				response.next(addedCourse);
				response.complete();

				this.store.dispatch({
					type: TOGGLE_SPINNER_OFF
				});

				subscription.unsubscribe();
			});

		return response;
	}

	public updateCourse(id: number, course: CourseDetailed): Subject<CourseDetailed> {
		const url = `${this.url}/${id}`;
		const response: Subject<CourseDetailed> = new Subject();

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		const subscription = this.http
			.put(url, course)
			.subscribe((responseData: Response): void => {
				const data = responseData.json();

				let addedCourse = null;

				if (data.id) {
					addedCourse = new CourseDetailed(data.id, data.name, data.description, data.duration,
						new Date(data.date), data.author, data.isTopRated);
				}

				response.next(addedCourse);
				response.complete();

				this.store.dispatch({
					type: EDIT_COURSE,
					payload: addedCourse
				});
				this.store.dispatch({
					type: TOGGLE_SPINNER_OFF
				});

				subscription.unsubscribe();
			});

		return response;
	}

	public removeCourse(id: number): Subject<boolean> {
		const url = `${this.url}/${id}`;
		const response = new Subject<boolean>();

		this.store.dispatch({
			type: TOGGLE_SPINNER_ON
		});

		const subscription = this.http
			.delete(url)
			.subscribe(() => {
				response.next(true);
				response.complete();

				this.store.dispatch({
					type: TOGGLE_SPINNER_ON
				});

				subscription.unsubscribe();
			});

		return response;
	}
}
