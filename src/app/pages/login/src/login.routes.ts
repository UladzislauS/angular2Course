import {
	Routes,
	RouterModule
} from '@angular/router';
import {
	LoginComponent
} from './login.component';
import {
	Breadcrumb
} from '../../../common/entities';

// Route Configuration
const loginRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
];

export const routes = RouterModule.forChild(loginRoutes);
