import {
	Routes,
	RouterModule
} from '@angular/router';

import {
	CourseEditComponent
} from './course-edit.component';

import {
	Breadcrumb
} from '../../../common/entities';

// Route Configuration
const loginRoutes: Routes = [
	{
		path: 'course-edit',
		component: CourseEditComponent
	}
];

export const routes = RouterModule.forChild(loginRoutes);
