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
    <div class="backpics">
    <div  *ngIf="user">
    <h3>Bonjour  {{ user.firtsName }} {{ user.name }} </h3>
      <div class="d-flex align-items-stretch justify-content-around  flex-wrap mt-3" >
      <div class="col-md-4  search-table-col"  >
        <div class="carte">
          <table class="table table-bordered table-hover" >
            <thead class="bill-header cs" >
            <tr>
              <th id="trs-hd" class="col-lg-2">Mes annonces</th>
              <th id="trs-hd" class="col-lg-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr  *ngFor="let p of user.products">
              <td>{{ p.title }}</td>
              <td>
                <a routerLink="product/edit/{{ p.id }}" class="btn btn-primary btn-sm m-1"><i class="fa fa-pen" style="font-size: 0.7em;"></i></a>
                <button class="btn btn-danger btn-sm" (click)="handleDelete(p)"><i class="fa fa-trash" style="font-size: 0.7em;"></i></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4 col-sm-2">
        <div class="carte">
          <table class="table table-bordered table-hover">
            <thead class="bill-header cs">
            <tr>
              <th id="trs-hd" class="col-lg-2">Mes Conversations</th>
              <th id="trs-hd" class="col-lg-2">Acheteur</th>
              <th id="trs-hd" class="col-lg-2">Voir</th>
            </tr>
            </thead>
            <tbody>
            <tr  *ngFor="let c of conversations">
              <td>{{ c.product.title }}</td>
              <td>{{ c.buyer.name }}</td>
              <td>
                <a routerLink="message/{{ c.id }}/{{c.product.id}}" class="btn btn-primary btn-sm"><i class="fas fa-reply-all" style="font-size: 0.7em;"></i></a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

      </div>

    </div>
  `,
  styles: [
    `
      .backpics{
        background-image: url("../../assets/images/grapes.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }
      .carte {

        box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 3px -2px rgba(0,0,0,.04), 0 3px 4px 0 rgba(0,0,0,.14);
        background-color: rgba(255,255,255,0.7);
      }
    `
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
