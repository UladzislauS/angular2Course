import {
	BrowserModule
} from '@angular/platform-browser';

import {
	FormsModule
} from '@angular/forms';

import {
	HttpModule
} from '@angular/http';

import {
	StoreModule
} from '@ngrx/store';

import {
	NgModule,
	ApplicationRef
} from '@angular/core';

import {
	removeNgStyles,
	createNewHosts,
} from '@angularclass/hmr';

import {
	RouterModule,
	PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import {
	ENV_PROVIDERS
} from './environment';

import {
	ROUTES
} from './app.routes';

import {
	AppComponent
} from './app.component';

import {
	NoContentComponent
} from './pages/no-content';

import {
	BreadcrumbsComponent,
	HeaderComponent,
	FooterComponent,
	LogoComponent,
	SpinnerComponent
} from './common/components';

// Pages
import {
	CourseDetailsModule
} from './pages/course-details';

import {
	CourseEditModule
} from './pages/course-edit';

import {
	CoursesModule
} from './pages/courses';

import {
	LoginModule
} from './pages/login';

// Services
import {
	AuthorizedHttp
} from './common/authorizedHttp';
import {
	AuthService,
	CoursesService
} from './common/services';

import {
	BreadcrumbsService
} from './common/components';

// Reducers
import {
	authReducer,
	coursesReducer,
	spinnerReducer
} from './common/reducers';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		LogoComponent,
		NoContentComponent,
		SpinnerComponent
	],
	imports: [
		BrowserModule,
		CoursesModule,
		CourseDetailsModule,
		CourseEditModule,
		FormsModule,
		HttpModule,
		LoginModule,
		RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
		StoreModule.provideStore({
			auth: authReducer,
			courses: coursesReducer,
			spinner: spinnerReducer
		})
	],
	providers: [
		ENV_PROVIDERS,
		AuthorizedHttp,
		AuthService,
		BreadcrumbsService,
		CoursesService
	]
})
export class AppModule {

	constructor(public appRef: ApplicationRef) {
	}

	public hmrOnInit(store: any) {
		if (!store || !store.state) { return; }
		this.appRef.tick();
		delete store.state;
	}

	public hmrOnDestroy(store: any) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: any) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}

}
