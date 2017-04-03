import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'courseDuration' })
export class CourseDurationPipe implements PipeTransform {
	public transform(duration: number) {
		return duration / 60 > 1
			? `${Math.floor(duration / 60)}h ${duration % 60}min`
			: `${duration % 60}min`;
	}
}
