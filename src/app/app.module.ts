import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductShowComponent } from './products/product-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductCreateComponent } from './products/product-create.component';
import { LoginComponent } from './auth/login.component';
import {RegisterComponent} from "./auth/register.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { RegistrerComponent } from './auth/registrer.component';
import { PaginationComponent } from './ui/pagination.component';
import {ToastrModule} from "ngx-toastr";
import { ProductEditComponent } from './products/product-edit.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from "./auth/token.interceptor";
import { UserComponent } from './auth/user.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import { NewMessageComponent } from './message/new-message.component';
import { HomeComponent } from './home/home.component';
import { ProductRegionComponent } from './products/product-region.component';



@NgModule({
  declarations: [AppComponent, NavbarComponent, ProductsComponent, ProductShowComponent, ProductCreateComponent, LoginComponent, RegisterComponent, RegistrerComponent, PaginationComponent, ProductEditComponent, UserComponent, ConversationComponent, MessageComponent, NewMessageComponent, HomeComponent, ProductRegionComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
