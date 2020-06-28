import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  public totalItems: number ;
  currentPage = 1;
  productsSubscription: Subscription;
  deleteSubscription: Subscription;

  subscriptions: Subscription[] = [];


  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const subscription = this.route.queryParamMap
      .pipe(
        map(params => params.has('page') ? +params.get('page') : 1),
        tap(page => this.currentPage = page),
        switchMap(page => this.productsService.findAll(page))
      )
      .subscribe((paginatedProducts) => {
        this.products = paginatedProducts.items;
        this.totalItems = paginatedProducts.total;
      });
    this.subscriptions.push(subscription);
  }

  handlePageChange(page: number){
    this.router.navigateByUrl('/products?page=' + page);
  }

  handleDelete(i: Product) {

    const productsCopy = [...this.products];
    const index = this.products.indexOf(i);
    this.products.splice(index, 1);



    const subscription = this.productsService.delete(i.id).subscribe(
      (invoice) => {},
      (error) => {
        this.products = productsCopy;
      }
    );
    this.subscriptions.push(subscription);
  }
  ngOnDestroy() {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}

