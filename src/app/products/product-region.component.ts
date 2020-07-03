import { Component, OnInit } from '@angular/core';
import {Product} from "./product";
import {Subscription} from "rxjs";
import {ProductsService} from "./products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-product-region',
  template: `

    <div *ngFor="let product of products">

      <div class="card border-success mb-3 d-flex flex-column">

        <div class="card-header">{{ product.title }}</div>
        <div class="card-body">
          <h4 class="card-title">{{ product.id }}</h4>

          <!--      <img style="width: 10rem;  display: block;" src="{{product.photo }}" alt="{{ product.title }}">-->

          <h4 class="card-title">Type</h4>
          <p class="card-text">{{product.type}}</p>
          <h5 class="card-title">
            Code Postal</h5>
          <p class="card-text">{{ product.ZipCode }}</p>
          <h5 class="card-title">prix</h5>
          <p class="card-text">{{ product.price }}euros</p>
        </div>
        <div class="card-body">
          <a  routerLink="/products/{{ product.id }}" class="btn btn-success">Voir l'annonce</a>


        </div>


      </div>
    </div>
    <app-pagination [itemsPerPage]="products.length"
                    [currentPage]="currentPage"
                    [items]="totalItems"
                    (pageChanged)="handlePageChange($event)"></app-pagination>


  `,
  styles: [
  ]
})
export class ProductRegionComponent implements OnInit {
region= null;
  products: Product[] = [];
  public totalItems: number ;
  currentPage = 1;
  productsSubscription: Subscription;
  deleteSubscription: Subscription;

  subscriptions: Subscription[] = [];


  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.region = this.route.snapshot.paramMap.get('region');
    const subscription = this.route.queryParamMap
      .pipe(
        map(params => params.has('page') ? +params.get('page') : 1),

        tap(page => this.currentPage = page),
        switchMap(page => this.productsService.findProductByRegion(page,this.region))
      )
      .subscribe((paginatedProducts) => {
        this.products = paginatedProducts.items;
        this.totalItems = paginatedProducts.total;
      });
    this.subscriptions.push(subscription);


  }
  handlePageChange(page: number){
    this.router.navigateByUrl('/products/region?page=' + page);
  }


}
