import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { CoursePreview } from '../../../common/entities';

// temporary
let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/courses.styles.scss')],
	templateUrl: '../tpl/courses.tpl.html'
})
export class CoursesComponent implements OnInit {
	private _courses: CoursePreview[];

	constructor() {
		this._courses = [];
	}

	public get courses(): CoursePreview[] {
		return this._courses;
	}

	public deleteCourse(id) {
		console.log(id);
	}

	public ngOnInit() {
		this._courses = [
			new CoursePreview(1, loremIpsum, '1h 10m', new Date() ),
			new CoursePreview(2, loremIpsum, '1h 10m', new Date() ),
			new CoursePreview(3, loremIpsum, '1h 10m', new Date() ),
			new CoursePreview(4, loremIpsum, '1h 10m', new Date() )
		];
	}
}
