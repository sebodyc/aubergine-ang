import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "./product";
import {UiService} from "../ui/ui.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-product-show',
  template: `

    <div class="card border-success mb-3 d-flex flex-column" *ngIf="product">

      <div class="card-header">{{ product.title }}</div>
      <div class="card-body">
        <img  *ngIf="product.productImage" src="http://localhost:3200/images/products/{{product.productImage}}" alt="{{ product.title }}">
        <h4 class="card-title">{{ product.id }}</h4>
        <p class="card-text"> description :{{ product.description}}</p>
        <h4 class="card-title">Type</h4>
        <p class="card-text">{{ product.type }}</p>
        <h5 class="card-title">
          Code Postal</h5>
        <p class="card-text">{{ product.ZipCode }}</p>
        <h5 class="card-title">prix</h5>
        <p class="card-text">{{ product.price }}euros</p>

        <p class="card-text" > vendeur {{ product.User.name }}</p>
      </div>
        <a class="btn btn-success" routerLink="/newMessage/{{ product.id }}" routerLinkActive="active" *ngIf="isAuthenticated">Envoyer un message</a>
    </div>

  `,
  styles: [
  ]
})
export class ProductShowComponent implements OnInit {
  public product: Product ;
  isAuthenticated= false;

  const // @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');




  constructor(private service : ProductsService, private route : ActivatedRoute, private  router : Router , private auth:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.service.find(this.id).subscribe((product) => (this.product = product));
  }

}
