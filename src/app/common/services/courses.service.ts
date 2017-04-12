import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { CourseDetailed } from '../entities';

// temporary
let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

@Injectable()
export class CoursesService {
	private _courses: BehaviorSubject<CourseDetailed[]>;

	constructor() {
		let newCourses: Observable<CourseDetailed> = Observable.of(
			new CourseDetailed(1, 'First course', loremIpsum, 100, new Date(), 'Uladzislau_S', 0, true ),
			new CourseDetailed(2, 'Second course', loremIpsum, 80, new Date('03.20.2017'), 'Uladzislau_S', 0, false ),
			new CourseDetailed(3, 'Third course', loremIpsum, 45, new Date('05.21.2017'), 'Uladzislau_S', 0, true ),
			new CourseDetailed(4, 'Fourth course', loremIpsum, 110, new Date('02.20.2016'), 'Uladzislau_S', 0, false ),
			new CourseDetailed(5, 'Fifth course', loremIpsum, 35, new Date('03.02.2017'), 'Uladzislau_S', 0, true ),
			new CourseDetailed(6, 'Sixth course', loremIpsum, 135, new Date('04.14.2017'), 'Uladzislau_S', 0, false )
		);

		newCourses
			.filter((course) => {
				let timeDiff = new Date().getTime() - course.date.getTime();

				return ( timeDiff / (1000 * 3600 * 24) ) < 14;
			})
			.map((course) => {
				course.name = `AngularJS 2: ${course.name}`;

				return course;
			})
			.toArray()
			.subscribe((courses) => {
				this._courses = new BehaviorSubject(courses);
			});
	}

	public get courses(): Observable<CourseDetailed[]> {
		return this._courses.asObservable();
	}

	public addNewCourse(course: CourseDetailed): Observable<CourseDetailed[]> {
		let courses: CourseDetailed[] = this._courses.getValue();
		courses.push(course);
		this._courses.next(courses);

		return this._courses;
	}

	public updateCourse(newCourse: CourseDetailed): Observable<CourseDetailed[]> {
		let course = this.getCourseById(newCourse.id);

		course.author = newCourse.author;
		course.date = newCourse.date;
		course.description = newCourse.description;
		course.duration = newCourse.duration;
		course.likes = newCourse.likes;

		return this._courses;
	}

	public removeCourse(id: number): Subject<CourseDetailed[]> {
		let course: CourseDetailed = this.getCourseById(id);
		let courses: CourseDetailed[] = this._courses.getValue();
		let index: number = courses.indexOf(course);
		let subject = new Subject<CourseDetailed[]>();

		setTimeout(() => {
			courses.splice(index, index || 1);
			this._courses.next(courses);
			subject.next(courses);
			subject.complete();
		}, 500);

		return subject;
	}

	public getCourseById(id: number): CourseDetailed {
		for ( let course of this._courses.getValue() ) {
			if (course.id === id) {
				return course;
			}
		}

		return null;
	}
}
