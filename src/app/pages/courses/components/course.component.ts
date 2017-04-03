import {
	EventEmitter,
	Component,
	ViewEncapsulation,
	Input,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { CourseDetailed } from '../../../common/entities';

@Component({
	selector: 'course',
	templateUrl: '../tpl/course.tpl.html',
	styles: [require('../styles/course.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
	@Input() public entity: CourseDetailed;
	@Output() public deleteCourse = new EventEmitter<number>();
}
