// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './courses.routes';

// custom components
import { ConfirmComponent } from '../components/confirm.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../components/course.component';
import { ToolboxComponent } from '../components/toolbox.component';

@NgModule({
	declarations: [
		ConfirmComponent,
		CoursesComponent,
		CourseComponent,
		ToolboxComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class CoursesModule {
	constructor() {
	}
}
