import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
	public transform(array: any[], field: string, value: string) {
		if (!value) {
			return array;
		}
		value = value.toLowerCase();

		return array.filter((node) => node[field].toLowerCase().indexOf(value) > -1);
	}
}
