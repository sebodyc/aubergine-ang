import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "./product";

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
          formControlName="zipCode"
          placeholder="Code Postal"
        >
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            formControlName="town"
            placeholder="Ville"
          >
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          formControlName="photo"
          placeholder="Photos"
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
    zipCode: new FormControl(''),
    town: new FormControl(''),
    photo : new FormControl('')
  });
  submitted= false;
  product: Product;



  constructor(private service: ProductsService, private router :Router) { }

  ngOnInit(): void {
  }

  handleSubmit(){
    // this.service.createProduct(this.form.value).subscribe((product)=>{
    //   this.router.navigateByUrl('/products');
    // });
  }

}
