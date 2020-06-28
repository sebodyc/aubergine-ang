import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div>
      <ul class="pagination">
        <li class="page-item " [class.disabled]="currentPage === 1">
          <button class="page-link"  (click)="handlePageClick(currentPage -1)">&laquo;</button>
        </li>
        <li class="page-item "
            [class.active]="page === currentPage"
            *ngFor="let page of pages">
          <button class="page-link"  (click)="handlePageClick(page)">{{ page }}</button>
        </li>
        <li class="page-item" [class.disabled]=" currentPage === pages.length">
          <button class="page-link"  (click)="handlePageClick(currentPage +1)">&raquo;</button>
        </li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class PaginationComponent implements OnInit {

  @Input()
  currentPage = 1;
  @Input()
  items: number;
  @Input()
  itemsPerPage = 5;

  @Output()
  pageChanged = new EventEmitter<number>();

  pages = [];


  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges){
    if (!changes.items){
      return;
    }
    const pageCount = Math.ceil(this.items / this.itemsPerPage);

    this.pages = [];
    for (let i = 1; i <= pageCount; i++){
      this.pages.push(i);
    }
  }

  handlePageClick(pageNumber: number){
    this.pageChanged.emit(pageNumber);
  }


}
