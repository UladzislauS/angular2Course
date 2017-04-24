import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/courses/1', pathMatch: 'full'},
	{path: 'courses', component: CoursesComponent},
	{path: '**', component: NoContentComponent},
];
