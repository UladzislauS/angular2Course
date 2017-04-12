import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDurationPipe } from './duration.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
	declarations: [
		CourseDurationPipe,
		FilterPipe,
		OrderByPipe
	],
	imports: [
		CommonModule
	],
	exports: [
		CourseDurationPipe,
		FilterPipe,
		OrderByPipe
	]
})
export class PipesModule {}
