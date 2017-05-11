import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details.component';
import { Breadcrumb } from '../../../common/entities';

// Route Configuration
const loginRoutes: Routes = [
	{
		path: 'course-details',
		component: CourseDetailsComponent
	}
];

export const routes = RouterModule.forChild(loginRoutes);
