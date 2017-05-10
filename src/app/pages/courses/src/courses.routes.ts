import {
	Routes,
	RouterModule
} from '@angular/router';
import {
	CoursesComponent
}    from './courses.component';
import {
	Breadcrumb
} from '../../../common/entities';

// Route Configuration
const coursesRoutes: Routes = [
	{
		path: 'courses/:page',
		component: CoursesComponent
	},
];

export const routes = RouterModule.forChild(coursesRoutes);
