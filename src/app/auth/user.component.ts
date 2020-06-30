import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "./auth.service";
import JwtDecode from 'jwt-decode';
import {Product} from "../products/product";
import {ProductsService} from "../products/products.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  template: `

    <h1>Mon Profil</h1>
    <div *ngIf="user">
    <h3>bonjour  {{ user.firtsName }} </h3>
    <tr *ngFor="let p of user.products">
      <td>{{ p.title }}</td>
      <td>{{ p.id }}</td>
      <button class="ml-3 btn-danger" (click)="handleDelete(p)">
        supprimer
      </button>
      <a routerLink="product/edit/{{ p.id }}" class="btn btn-primary btn-sm"
      >modifier</a
      >
    </tr>

    </div>
  `,
  styles: [
  ]
})
export class UserComponent implements OnInit {
user: User;
product: Product[] = [];


  constructor( private userService:UserService,  private route: ActivatedRoute,private auth:AuthService , private productsService:ProductsService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    const id =JwtDecode(this.auth.getToken()).id;

  this.userService.find(id).subscribe((user) => (this.user = user));


  }

  handleDelete(p){
    const productCopy= [...this.product];
     const  index = this.product.indexOf(p);
     console.log(index);
     console.log(p.id);

     this.product.splice(index,1);

     this.productsService.delete(p.id).subscribe(
       ()=>{
         this.toastr.success("l 'annonce a bien été suprimmée")
       },
       ()=>{
         this.product = productCopy;
       }
     )



  }

}
