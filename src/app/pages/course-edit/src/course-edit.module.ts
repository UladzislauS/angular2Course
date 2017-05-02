// angular modules
import {
	NgModule
} from '@angular/core';

import {
	ReactiveFormsModule,
	FormsModule
} from '@angular/forms';

import {
	CommonModule
} from '@angular/common';

// routes
import {
	routes
} from './course-edit.routes';

// custom components
import {
	CourseEditComponent
} from './course-edit.component';

import {
	DateInputComponent
} from '../components/date-input.component';

import {
	DurationInputComponent
} from '../components/duration-input.component';

// pipes
import {
	PipesModule
} from '../../../common/pipes';

@NgModule({
	declarations: [
		CourseEditComponent,
		DateInputComponent,
		DurationInputComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		PipesModule
	],
	providers: []
})
export class CourseEditModule {}
