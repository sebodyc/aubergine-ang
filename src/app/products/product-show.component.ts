import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "./product";
import {UiService} from "../ui/ui.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-product-show',
  template: `

    <div class="container mt-4" *ngIf="product">
      <div class="row pb-3 ">
        <div class="col-auto col-sm-12 col-md-6 col-lg-6 userinfo mr-2 mb-3" style="border-radius: 2em "> <img style="border-radius: 1em " class="img-fluid p-3" *ngIf="product.productImage" src="http://localhost:3200/images/products/{{product.productImage}}" alt="{{ product.title }}">
          <h2>{{ product.title }}</h2>
          <hr />
          <h6>Description : </h6>
          <p class="card-text">{{ product.description}}</p>
          <hr /><span class="badge badge-primary">Catégorie : {{ product.type }}</span>
          <h4>Prix : {{product.price}}</h4>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-5  text-center " >
          <div class="row">
            <div class="col userinfo p-3" style="border-radius: 2em " >
              <h3>Vendeur {{product.User.firtsName }}.{{product.User.name |uppercase | slice:0:1}}</h3>
              <hr />
              <a class="btn btn-success" routerLink="/newMessage/{{ product.id }}" routerLinkActive="active" *ngIf="isAuthenticated">Envoyer un message</a>
              <p *ngIf="!isAuthenticated"> Veuillez vous connecter pour contacter le vendeur </p>
            </div>
          </div>
        </div>
      </div>
    </div>


  `,
  styles: [
    `
      .userinfo {
        box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 3px -2px rgba(0,0,0,.04), 0 3px 4px 0 rgba(0,0,0,.14);
      }
    `
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
