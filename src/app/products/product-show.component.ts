import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "./product";
import {UiService} from "../ui/ui.service";
import {AuthService} from "../auth/auth.service";
import {Message} from "../message/message";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "../message/message.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-product-show',
  template: `
    <div class="backpics">
    <div class="container mt-4 carte" *ngIf="product">
      <div class="row pb-3  ">
        <div class="col-auto col-sm-12 col-md-6 col-lg-6 userinfo mr-4 mb-3 text-center" style="border-radius: 2em "> <img  class="img-fluid p-3"   *ngIf="product.productImage" src="http://localhost:3200/images/products/{{product.productImage}}" alt="{{ product.title }}" style="border-radius: 2em ">
          <h2> {{ product.title }}</h2>
          <hr />
          <h6>Description : </h6>
          <p class="card-text">{{ product.description}}</p>
          <hr /><span class="badge badge-primary">Catégorie : {{ product.type }}</span>
          <h4>Prix : {{product.price}} € </h4>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-5  text-center " >
          <div class="row">
            <div class="col userinfo p-3" style="border-radius: 2em " >
              <h3>Vendeur {{product.User.firtsName }}.{{product.User.name |uppercase | slice:0:1}}</h3>
              <hr />
              <div *ngIf="isAuthenticated">
              <form [formGroup]="form" (ngSubmit)="handleSubmit()" >
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    formControlName="content"
                    placeholder="Votre message"
                  >
                </div>
                <button type="submit" class="btn btn-success"><i class="far fa-envelope"></i> Envoyer un message</button>
              </form>
              </div>
              <p *ngIf="!isAuthenticated"> Veuillez vous connecter pour contacter le vendeur </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>



  `,
  styles: [
    `
      .carte{

      }
      .backpics{
        background-image: url("../../assets/images/straw.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }

      .userinfo {
        box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 3px -2px rgba(0,0,0,.04), 0 3px 4px 0 rgba(0,0,0,.14);
        background-color: rgba(255,255,255,0.7);
      }
    `
  ]
})
export class ProductShowComponent implements OnInit {
  submitted = true;
  messages: Message []=[];




  public product: Product ;
  isAuthenticated= false;

  const // @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');


  constructor( private messageService : MessageService,private service : ProductsService,
               private route : ActivatedRoute, private  router : Router , private ui:UiService,
               private auth:AuthService,
               ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.service.find(this.id).subscribe((product) => (this.product = product));
  }

  form = new FormGroup({
    content: new FormControl(''),
    annonceId: new FormControl(this.id),

  });

  handleSubmit(){
    console.log(this.form.value);
    this.submitted = true;
    this.messageService
      .sendMessage(this.form.value )
      .subscribe(
        (invoice) => {

          Swal.fire({
            title: 'Message bien envoyé !!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000

          });
          this.form.reset();


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
