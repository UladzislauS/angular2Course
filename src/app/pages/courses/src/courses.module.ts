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

// directives
import { CourseHighlightDirective } from '../directives/cource-highlight.directive';

// pipes
import { PipesModule } from '../../../common/pipes';

@NgModule({
	declarations: [
		ConfirmComponent,
		CoursesComponent,
		CourseComponent,
		ToolboxComponent,
		CourseHighlightDirective
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
export class CoursesModule {
	constructor() {
	}
}
