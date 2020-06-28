import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductShowComponent} from "./products/product-show.component";

import {ProductCreateComponent} from "./products/product-create.component";
import {LoginComponent} from "./auth/login.component";
import {RegisterComponent} from "./auth/register.component";
import {RegistrerComponent} from "./auth/registrer.component";


const routes: Routes = [
  { path:'products', component: ProductsComponent},
  { path: 'register', component: RegisterComponent },
  { path:'products/:id', component:ProductShowComponent},
  { path:'product/create' , component:ProductCreateComponent},
  { path: 'registrer', component:RegistrerComponent },
  { path: 'login', component:LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
