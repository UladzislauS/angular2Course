import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import {
	Observable
} from 'rxjs';

@Component({
	selector: 'pagination',
	templateUrl: '../tpl/pagination.tpl.html',
	styles: [require('../styles/pagination.styles.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges, OnInit {
	public pagesCount: number;
	public pageRange: Observable<number[]>;

	@Input() public currentPage: number;
	@Input() private totalCount: number;

	private offset: number;
	private pageSize: number;

	constructor() {
		this.currentPage = 1;
		this.offset = 0;
		this.pagesCount = 1;
		this.pageSize = 10;
		this.totalCount = 0;
	}

	public ngOnChanges(): void {
		this.ngOnInit();
	}

	public ngOnInit(): void {
		this.pageRange = this.getPageRange();
		this.pagesCount = this.getPagesCount();
	}

	private getPagesCount(): number {
		return Math.ceil(Math.max(this.totalCount, 1) / Math.max(this.pageSize, 1));
	}

	private getPageRange(): Observable<number[]> {
		return Observable
			.range( -3, 7)
			.map((page: number): number => page + this.currentPage)
			.filter((page: number): boolean => this.isValidPageNumber(page))
			.toArray();
	}

	private isValidPageNumber(page: number): boolean {
		return page > 1 && page < this.pagesCount;
	}
}
