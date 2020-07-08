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

<div class="container-fluid backpics">

<div class="col-auto col-sm-12 col-md-6 col-lg-6">
  <div class="blur p-3">
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
        <select class="form-control" formControlName="type"  >
          <option value="" disabled selected hidden> Type de transaction </option>
          <option *ngFor="let t of types" [ngValue]="t">
            {{t}}
          </option>
        </select>

      </div>
      <div class="form-group">
        <select class="form-control" formControlName="region">
          <option value="" disabled selected hidden> Région</option>
          <option *ngFor="let r of regions" [ngValue]="r">
            {{r}}
          </option>
        </select>
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
        ></div>
      <div class="form-group">
        <input

          type="file"
          #fileInput
          class="form-control-file"
          formControlName="productImageFile"
          placeholder="Image"
        >

      </div>
      <button type="submit" class="btn btn-success">envoyer</button>
    </form>
  </div>
   <ng-template #customLoadingTemplate>
     <div class="custom-class">
     </div>
   </ng-template>
   <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" [template]="customLoadingTemplate"></ngx-loading>
</div>
</div>
  `,
  styles: [
    `
      .backpics{
        background-image: url("../../assets/images/paper.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }
      .blur{
        border-radius: 2em;
        box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 3px -2px rgba(0,0,0,.04), 0 3px 4px 0 rgba(0,0,0,.14);
        background-color: rgba(255,255,255,0.4);
      }
    `
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
