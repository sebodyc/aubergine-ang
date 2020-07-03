import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";

export  interface PaginatedProduct {
  items: Product[];
  total: number;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  findAll(page: number = 1) {

    return this.http
      .get<PaginatedProduct>(environment.apiUrl + '/products?page=' + page)
      .pipe(
        map((data) => {
          const paginatedProduct: PaginatedProduct = {
            items: data['hydra:member'] as Product[],
            total: data['hydra:totalItems'],
            page,
          };
          return paginatedProduct;

        })
      );
  }

  delete(id: number) {
    return this.http.delete<Product>(environment.apiUrl + '/products/' + id);
  }

  find(id: number) {
    return this.http.get<Product>(environment.apiUrl + '/products/' + id);
  }

  create(product: Product) {
    return this.http.post<Product>(environment.apiUrl + '/products', product);
  }

  update(product: Product) {
    return this.http.put<Product>(
      environment.apiUrl + '/products/' + product.id,
      product
    );
  }

  findProductByRegion(page: number = 1 , region){

    return this.http
      .get<PaginatedProduct>(environment.apiUrl + '/products?page=' + page +'&region=' + region)
      .pipe(
        map((data) => {
          const paginatedProduct: PaginatedProduct = {
            items: data['hydra:member'] as Product[],
            total: data['hydra:totalItems'],
            page,
          };
          return paginatedProduct;

        })
      );
  }


  regions= [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val-de-Loire",
    "Corse",
    "Grand-Est",
    "Hauts-de-France",
    "Ile-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays-de-la-Loire",
    "Provence-Alpes-Côte d'Azur",
  ];

  types= [
    "Troc",
    "Vente",
  ]

}
