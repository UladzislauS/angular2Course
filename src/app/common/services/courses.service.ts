import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CourseDetailed } from '../entities';

// temporary
let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

@Injectable()
export class CoursesService {
	private _courses: BehaviorSubject<CourseDetailed[]>;

	constructor() {
		this._courses = new BehaviorSubject([
			new CourseDetailed(1, loremIpsum, '1h 10m', new Date(), 'Uladzislau_S', 0 ),
			new CourseDetailed(2, loremIpsum, '1h 20m', new Date(), 'Uladzislau_S', 0 ),
			new CourseDetailed(3, loremIpsum, '1h 35m', new Date(), 'Uladzislau_S', 0 ),
			new CourseDetailed(4, loremIpsum, '1h 55m', new Date(), 'Uladzislau_S', 0 )
		]);
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

	public removeCourse(id: number): Observable<CourseDetailed[]> {
		let course: CourseDetailed = this.getCourseById(id);
		let courses: CourseDetailed[] = this._courses.getValue();
		let index: number = courses.indexOf(course);

		courses.splice(index, index || 1);
		this._courses.next(courses);

		return this._courses;
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
