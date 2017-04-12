import {
	Component,
	ViewEncapsulation,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'course-edit',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/course-edit.styles.scss')],
	templateUrl: '../tpl/course-edit.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent {
	public title: string;
	public description: string;
	public date: Date;
	public duration: number;

	constructor(private router: Router) {
		this.title = '';
		this.description = '';
		this.date = null;
		this.duration = 0;
	}

	public cancel(): void {
		this.router.navigate(['/courses']);
	}

	public add(): void {
		this.router.navigate(['/courses']);
	}
}
