import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
	public transform(array: any[], field: string) {
		array.sort((a, b) => {
			if (a[field] > b[field]) {
				return 1;
			}
			if (a[field] < b[field]) {
				return -1;
			}
			return 0;
		});

		return array;
	}
}
