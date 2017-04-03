import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
	selector: '[courseHighlight]'
})
export class CourseHighlightDirective {
	constructor(private element: ElementRef) {}

	@Input() public set date(date: Date) {
		let currentDate = new Date();
		let twoWeeksAgo = new Date(currentDate.getTime() - 1209600000);
		if (date < currentDate && date > twoWeeksAgo) {
			this.element.nativeElement.style.border = '2px solid green';
		}
		if (date > currentDate) {
			this.element.nativeElement.style.border = '2px solid blue';
		}
	};
}
