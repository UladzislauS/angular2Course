import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';

import {
	Subscription,
	Subject
} from 'rxjs';

import { BreadcrumbsService } from './breadcrumbs.service';
import { Breadcrumb } from '../../../entities';

@Component({
	selector: 'breadcrumbs',
	styles: [require('../styles/breadcrumbs.styles.scss')],
	encapsulation: ViewEncapsulation.None,
	templateUrl: '../tpl/breadcrumbs.tpl.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {
	public breadcrumbs: Breadcrumb[];

	private subscription: Subscription;

	constructor(
		private breadcrumbsService: BreadcrumbsService,
		private changeDetector: ChangeDetectorRef,
	) {
		this.breadcrumbs = [];
	}

	public ngOnInit() {
		this.subscription = this.breadcrumbsService
			.getBreadcrumbs()
			.subscribe((breadcrumbs: Breadcrumb[]) => {
				this.breadcrumbs = breadcrumbs;
				this.changeDetector.markForCheck();
			});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
