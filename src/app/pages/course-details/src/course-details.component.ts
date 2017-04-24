import {
	Component,
	ViewEncapsulation,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';

import { CourseDetailed } from '../../../common/entities';

// temporary
let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

@Component({
	selector: 'course-details',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/course-details.styles.scss')],
	templateUrl: '../tpl/course-details.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent {
	private _course: CourseDetailed;

	constructor() {
		this._course = new CourseDetailed(1, 'First course', loremIpsum, 110, new Date(), 'Uladzislau Sipaila', false);
	}

	get course(): CourseDetailed {
		return this._course;
	}
}
