import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "./auth.service";
import JwtDecode from 'jwt-decode';
import {Product} from "../products/product";
import {ProductsService} from "../products/products.service";
import {ToastrService} from "ngx-toastr";
import {ConversationService} from "../conversation/conversation.service";
import {Conversation} from "../conversation/conversation";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'app-user',
  template: `

    <h1>Mon Profil</h1>
    <div *ngIf="user">
    <h3>bonjour  {{ user.firtsName }} </h3>
      <h2>Mes annonces</h2>
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

    <h1>Mes conversations</h1>
    <div  *ngFor="let c of conversations">
      <h3>n° {{  c.id }}</h3>
      <h4> Au sujet de l'annonce  : {{ c.product.title }} </h4>
      <tr>
        <td> Nom de l'acheteur :{{ c.buyer.name }}</td>
      </tr>
      <a routerLink="message/{{ c.id }}" class="btn btn-primary btn-sm">Voir le fils</a>
    </div>
  `,
  styles: [
  ]
})
export class UserComponent implements OnInit {
user: User;
product: Product[] = [];
conversations: Conversation []=[];



  constructor( private userService:UserService,
               private route: ActivatedRoute,
               private auth:AuthService ,
               private productsService:ProductsService,
               private toastr: ToastrService,
               private service:ConversationService,
               private  messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id =JwtDecode(this.auth.getToken()).id;
  this.userService.find(id).subscribe((user) => (this.user = user));



    this.service
      .findConversation()
      .subscribe((conversation)=>(this.conversations=conversation));
    console.log(this.conversations);


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
