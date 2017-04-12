// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './course-edit.routes';

// custom components
import { CourseEditComponent } from './course-edit.component';

// pipes
import { PipesModule } from '../../../common/pipes';

@NgModule({
	declarations: [
		CourseEditComponent
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
