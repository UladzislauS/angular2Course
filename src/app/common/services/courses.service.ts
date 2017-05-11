import {
	Injectable
} from '@angular/core';

import {
	Response
} from '@angular/http';

import {
	Observable,
	BehaviorSubject,
	Subject
} from 'rxjs';

import {
	AuthorizedHttp
} from '../authorizedHttp';

import {
	CourseDetailed
} from '../entities';

@Injectable()
export class CoursesService {
	private url = 'http://localhost:3001/courses';

	private courses: BehaviorSubject<CourseDetailed[]>;
	private filter: string;
	private page: number;
	private totalCount: number;

	constructor(
		private http: AuthorizedHttp
	) {
		this.courses = new BehaviorSubject([]);
		this.totalCount = 0;
	}

	public getCourses(page: number, filter: string): Observable<CourseDetailed[]> {
		const url = `${this.url}?name_like=${filter || ''}&_page=${page}&_limit=${10}`;

		this.page = page;
		this.filter = filter;

		const subscription = this.http
			.get(url)
			.subscribe((response: Response): void => {
				const data = response.json();
				const courses = data.map((node) => {
					return new CourseDetailed(node.id, node.name, node.description, node.duration, node.date,
						node.author, node.isTopRated);
				});

				this.totalCount = +response.headers.get('X-Total-Count');
				this.courses.next(courses);

				subscription.unsubscribe();
			});

		return this.courses.asObservable();
	}

	public getTotalCount(): number {
		return this.totalCount;
	}

	public getCourse(id: number): Subject<CourseDetailed> {
		const url = `${this.url}?id=${id}`;
		const course: Subject<CourseDetailed> = new Subject();

		const subscription = this.http
			.get(url)
			.subscribe((response: Response): void => {
				const data = response.json();
				const courses = data.map((node) => {
					return new CourseDetailed(node.id, node.name, node.description, node.duration, new Date(node.date),
						node.author, node.isTopRated);
				});

				course.next(courses[0]);
				subscription.unsubscribe();
			});

		return course;
	}

	public addNewCourse(course: CourseDetailed): Subject<CourseDetailed> {
		const newCourse: Subject<CourseDetailed> = new Subject();

		const subscription = this.http
			.post(this.url, course)
			.subscribe((response: Response): void => {
				const data = response.json();

				let addedCourse = null;

				if (data.id) {
					addedCourse = new CourseDetailed(data.id, data.name, data.description, data.duration,
						new Date(data.date), data.author, data.isTopRated);
				}

				newCourse.next(addedCourse);
				subscription.unsubscribe();
			});

		return newCourse;
	}

	public updateCourse(id: number, course: CourseDetailed): Subject<CourseDetailed> {
		const url = `${this.url}/${id}`;
		const newCourse: Subject<CourseDetailed> = new Subject();

		const subscription = this.http
			.put(url, course)
			.subscribe((response: Response): void => {
				const data = response.json();

				let addedCourse = null;

				if (data.id) {
					addedCourse = new CourseDetailed(data.id, data.name, data.description, data.duration,
						new Date(data.date), data.author, data.isTopRated);
				}

				newCourse.next(addedCourse);
				subscription.unsubscribe();
			});

		return newCourse;
	}

	public removeCourse(id: number): Subject<CourseDetailed[]> {
		const url = `${this.url}/${id}`;
		const subject = new Subject<CourseDetailed[]>();

		const deleteReqSubscription = this.http.delete(url).subscribe(() => {
			const getReqSubscription = this.getCourses(this.page, this.filter).subscribe((courses: CourseDetailed[]) => {
				subject.next(courses);
				subject.complete();
				getReqSubscription.unsubscribe();
			});

			deleteReqSubscription.unsubscribe();
		});

		return subject;
	}
}
