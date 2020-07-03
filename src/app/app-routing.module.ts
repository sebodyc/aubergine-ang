import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductShowComponent} from "./products/product-show.component";

import {ProductCreateComponent} from "./products/product-create.component";
import {LoginComponent} from "./auth/login.component";
import {RegisterComponent} from "./auth/register.component";
import {RegistrerComponent} from "./auth/registrer.component";
import {UserComponent} from "./auth/user.component";
import {ProductEditComponent} from "./products/product-edit.component";
import {ConversationComponent} from "./conversation/conversation.component";
import {MessageComponent} from "./message/message.component";
import {NewMessageComponent} from "./message/new-message.component";
import {HomeComponent} from "./home/home.component";
import {ProductRegionComponent} from "./products/product-region.component";
import {FormGuard} from "./ui/guard/form.guard";


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path:'products', component: ProductsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'products/region/:region', component: ProductRegionComponent},
  { path:'products/:id', component:ProductShowComponent},
  { path:'product/create' , component:ProductCreateComponent, canDeactivate: [FormGuard]},
  { path:'profile/product/edit/:id', component:ProductEditComponent , canDeactivate: [FormGuard]},
  { path: 'registrer', component:RegistrerComponent },
  { path: 'login', component:LoginComponent },
  { path: 'profile', component:UserComponent },
  { path: 'inbox', component:ConversationComponent},
  { path: 'profile/message/:id', component: MessageComponent, canDeactivate: [FormGuard]},
  { path: 'newMessage/:id', component: NewMessageComponent, canDeactivate: [FormGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
