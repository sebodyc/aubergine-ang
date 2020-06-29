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


const routes: Routes = [
  { path:'products', component: ProductsComponent},
  { path: 'register', component: RegisterComponent },
  { path:'products/:id', component:ProductShowComponent},
  { path:'product/create' , component:ProductCreateComponent},
  { path:'profile/product/edit/:id', component:ProductEditComponent},
  { path: 'registrer', component:RegistrerComponent },
  { path: 'login', component:LoginComponent },
  { path: 'profile', component:UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
