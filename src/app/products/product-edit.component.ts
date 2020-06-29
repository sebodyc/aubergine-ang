import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../auth/user";
import {Product} from "./product";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../auth/user.service";
import {ProductsService} from "./products.service";

@Component({
  selector: 'app-product-edit',
  template: `
    <h1>Creer une annonce</h1>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()" >
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          formControlName="title"
          placeholder="Titre de l'annonce"
        >
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          formControlName="description"
          placeholder="Description de l'annonce"
        >
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          formControlName="type"
          placeholder="Type de transaction"
        >
      </div>
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          formControlName="price"
          placeholder="Prix de l'article"
        >
      </div>
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          formControlName="zipCode"
          placeholder="Code Postal"
        >

      </div>

      <button type="submit" class="btn btn-success">envoyer</button>
    </form>
  `,
  styles: [
  ]
})
export class ProductEditComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    zipCode: new FormControl(''),



  });
  user: User;
  submitted= false;
  product: Product;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private userService: UserService,
               private productsService: ProductsService,

  ) { }

  ngOnInit(): void {


  }
handleSubmit(){}
}
