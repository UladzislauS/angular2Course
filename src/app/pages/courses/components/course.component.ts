import {
	EventEmitter,
	Component,
	ViewEncapsulation,
	Input,
	Output } from '@angular/core';
import { CoursePreview } from '../../../common/entities';

@Component({
	selector: 'course',
	templateUrl: '../tpl/course.tpl.html',
	styles: [require('../styles/course.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public entity: CoursePreview;
	@Output() public deleteCourse = new EventEmitter<string>();
}
