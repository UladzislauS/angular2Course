// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './login.routes';

// custom components
import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../components/login-form.component';

@NgModule({
	declarations: [
		LoginComponent,
		LoginFormComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class LoginModule {
	constructor() {
	}
}
