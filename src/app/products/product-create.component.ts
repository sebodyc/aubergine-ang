import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "./products.service";
import { environment } from 'src/environments/environment';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "./product";
import {User} from "../auth/user";
import {UserService} from "../auth/user.service";
import {UiService} from "../ui/ui.service";

import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

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
        <select formControlName="type"  >
          <option value="" disabled selected hidden> Type de transaction </option>
          <option *ngFor="let t of types" [ngValue]="t">
            {{t}}
          </option>
        </select>

      </div>
      <div class="form-group">
        <select formControlName="region">
          <option value="" disabled selected hidden> Région</option>
          <option *ngFor="let r of regions" [ngValue]="r">
            {{r}}
          </option>
        </select>

<!--        <input-->
<!--          type="text"-->
<!--          class="form-control"-->
<!--          formControlName="region"-->
<!--          placeholder="Votre region"-->
<!--        >-->
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
          formControlName="ZipCode"
          placeholder="Code Postal"
        >
        <input
          type="file"
          #fileInput
          class="form-control"
          formControlName="productImageFile"
          placeholder="Image"
        >

      </div>


      <button type="submit" class="btn btn-success">envoyer</button>
    </form>
   <ng-template #customLoadingTemplate>
     <div class="custom-class">
     </div>
   </ng-template>
   <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" [template]="customLoadingTemplate"></ngx-loading>
  `,
  styles: [
  ]
})
export class ProductCreateComponent implements OnInit {
  public loading = false;
 regions= this.service.regions;
 types= this.service.types;
  @ViewChild('fileInput')
  fileInput: ElementRef<HTMLInputElement>;

  form = new FormGroup({
    title: new FormControl(''),
    price: new FormControl('0'),
    description: new FormControl(''),
    type: new FormControl(''),
    region: new FormControl(''),
    productImageFile: new FormControl(''),
    ZipCode: new FormControl(''),
  });

  user: User;
  submitted= false;
  product: Product;
  constructor(private service: ProductsService,
              private router :Router,
              private userService : UserService,
              private ui: UiService,
              private http: HttpClient,
              private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

  }


  handleSubmit(){
    this.submitted=true;
    this.loading = true;
    const data = new FormData();
    data.append('title',this.form.value.title);
    data.append('price',this.form.value.price);
    data.append('description', this.form.value.description);
    data.append('type' , this.form.value.type);
    data.append('region' , this.form.value.region);
    data.append('ZipCode' , this.form.value.ZipCode);
    data.append('productImageFile', this.fileInput.nativeElement.files[0]);

    this.http.post(environment.apiUrl +'/products',data).subscribe(()=>{
      this.toastr.success("Félicitation l'annonce est créée");
      this.router.navigateByUrl('/profile');
      this.loading = false;
    });


  }



}
