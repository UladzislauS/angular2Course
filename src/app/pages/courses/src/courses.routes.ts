import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent }    from './courses.component';

// Route Configuration
const coursesRoutes: Routes = [
	{ path: 'courses/:page', component: CoursesComponent },
];

export const routes = RouterModule.forChild(coursesRoutes);
