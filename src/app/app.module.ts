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
	BreadcrumbsService,
	SpinnerService
} from './common/components';

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
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
		CoursesModule,
		CourseDetailsModule,
		CourseEditModule,
		LoginModule
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		AuthorizedHttp,
		AuthService,
		BreadcrumbsService,
		CoursesService,
		SpinnerService
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
