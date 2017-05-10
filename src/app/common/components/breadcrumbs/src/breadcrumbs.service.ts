import {
	Injectable
} from '@angular/core';

import {
	Subject
} from 'rxjs';

import {
	Breadcrumb
} from '../../../entities';

@Injectable()
export class BreadcrumbsService {
	public breadcrumbs: Subject<Breadcrumb[]>;

	constructor() {
		this.breadcrumbs = new Subject();
	}

	public setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
		this.breadcrumbs.next(breadcrumbs);
	}

	public getBreadcrumbs(): Subject<Breadcrumb[]> {
		return this.breadcrumbs;
	}
}
