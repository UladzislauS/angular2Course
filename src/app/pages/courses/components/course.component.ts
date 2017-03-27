import {
	EventEmitter,
	Component,
	ViewEncapsulation,
	Input,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { CoursePreview } from '../../../common/entities';

@Component({
	selector: 'course',
	templateUrl: '../tpl/course.tpl.html',
	styles: [require('../styles/course.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
	@Input() public entity: CoursePreview;
	@Output() public deleteCourse = new EventEmitter<number>();
}
