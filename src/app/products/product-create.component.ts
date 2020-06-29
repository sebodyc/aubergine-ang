import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "./product";
import {User} from "../auth/user";
import {UserService} from "../auth/user.service";
import {UiService} from "../ui/ui.service";

import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-product-create',
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
          formControlName="ZipCode"
          placeholder="Code Postal"
        >

      </div>

      <button type="submit" class="btn btn-success">envoyer</button>
    </form>
  `,
  styles: [
  ]
})
export class ProductCreateComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    ZipCode: new FormControl(''),
  });

  user: User;
  submitted= false;
  product: Product;
  constructor(private service: ProductsService,
              private router :Router,
              private userService : UserService,
              private ui: UiService,

  ) { }

  ngOnInit(): void {

  }

  handleSubmit(){
    console.log(this.form.value);
    this.submitted = true;
    this.service
      .create(this.form.value )
      .subscribe(
        (invoice) => {
          this.router.navigateByUrl('/products');
        },
        (error) => {
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationInForm(this.form, error.error.violations);
            return;
          }
        }
      );
  }



}
