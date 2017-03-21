import { Injectable } from '@angular/core';
import { CourseDetailed } from '../entities';

// temporary
let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

@Injectable()
export class CoursesService {
	private _courses: CourseDetailed[] = [
		new CourseDetailed(1, loremIpsum, '1h 10m', new Date(), 'Uladzislau_S', 0 ),
		new CourseDetailed(2, loremIpsum, '1h 20m', new Date(), 'Uladzislau_S', 0 ),
		new CourseDetailed(3, loremIpsum, '1h 35m', new Date(), 'Uladzislau_S', 0 ),
		new CourseDetailed(4, loremIpsum, '1h 55m', new Date(), 'Uladzislau_S', 0 )
	];

	public get courses(): CourseDetailed[] {
		return this._courses;
	}

	public getCourseById(id: number): CourseDetailed {
		for (let course of this._courses) {
			if (course.id === id) {
				return course;
			}
		}

		return null;
	}

	public addNewCourse(course: CourseDetailed): CourseDetailed {
		this._courses.push(course);

		return course;
	}

	public updateCourse(newCourse: CourseDetailed): CourseDetailed {
		let course = this.getCourseById(newCourse.id);

		course.author = newCourse.author;
		course.date = newCourse.date;
		course.description = newCourse.description;
		course.duration = newCourse.duration;
		course.likes = newCourse.likes;

		return course;
	}

	public removeCourse(id: number) {
		let course = this.getCourseById(id);
		let index = this._courses.indexOf(course);

		this._courses.splice(index, index || 1);

		return this._courses;
	}
}
