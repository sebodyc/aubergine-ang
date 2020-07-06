import { Component, OnInit } from '@angular/core';
import {Product} from "./product";
import {Subscription} from "rxjs";
import {ProductsService} from "./products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-product-region',
  template: `
    <div class=" teub  "  >
      <div class="container-fluid pb-3 pl-0">
        <div class="d-flex align-items-stretch justify-content-around  flex-wrap">
          <div class="card cardbase   col-sm-12 col-lg-2 col-md-6 p-3 m-2" style="width: 18rem;"  *ngFor="let product of products">
            <img class="img-fluid" style="border-radius: 1em "  *ngIf="product.productImage" src="http://localhost:3200/images/products/{{product.productImage}}" alt="{{ product.title }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description |slice:0:20}} ...</p>
              <p class="card-text">{{ product.ZipCode }}</p>
              <a  routerLink="{{ product.id }}"  class="btn btn-primary">Voir l'annonce</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <app-pagination [itemsPerPage]="products.length"
                    [currentPage]="currentPage"
                    [items]="totalItems"
                    (pageChanged)="handlePageChange($event)"></app-pagination>


  `,
  styles: [
    `
      .teub{
        background-image: url("../../assets/images/young-tomato.png");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }

      .cardbase{
        background-color: rgba(255,255,255,0.7);
        border-radius: 1em ;
      }
    `
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
