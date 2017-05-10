import {
	Component,
	ViewEncapsulation,
	OnInit
} from '@angular/core';

import {
	BreadcrumbsService
} from '../../../common/components';

import {
	Breadcrumb
} from '../../../common/entities';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('../styles/login.styles.scss')],
	templateUrl: '../tpl/login.tpl.html'
})
export class LoginComponent implements OnInit{
	constructor(private breadcrumbService: BreadcrumbsService) {}

	public ngOnInit() {
		this.breadcrumbService.setBreadcrumbs([
			new Breadcrumb('Courses', ['/courses/1'])
		]);
	}
}
