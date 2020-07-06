import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import JwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: `







    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <img   src="../../assets/images/courgettep.png" alt="">
                  <form [formGroup]="form" (ngSubmit)="handleSubmit()">
                    <div class="form-label-group">
                      <input
                        id="inputEmail"
                        class="form-control"
                        [class.is-invalid]="form.controls['username'].invalid"
                        type="email"
                        placeholder="adresse email de connexion"
                        formControlName="username"
                        required autofocus
                      />
                      <p
                        class="invalid-feedback"
                        *ngIf="submitted && form.controls['username'].hasError('required')"
                      >
                        L'adresse email est obligatoire pour se connecter
                      </p>
                      <p
                        class="invalid-feedback"
                        *ngIf="submitted && form.controls['username'].hasError('email')"
                      >
                        Format incorrect veiller à renseigner une adresse email valide merci.
                      </p>
                    </div>

                    <div class="form-label-group">
                      <input
                        class="form-control"
                        [class.is-invalid]="form.controls['password'].invalid"
                        type="password"
                        placeholder="mot de passe"
                        formControlName="password"
                      />
                      <p
                        class="invalid-feedback"
                        *ngIf="submitted && form.controls['password'].hasError('required')"
                      >
                        Mot de passe obligatoire
                      </p>

                    </div>
                    <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Se connecter</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




    <ng-template #customLoadingTemplate>
      <div class="custom-class">
      </div>
    </ng-template>
    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" [template]="customLoadingTemplate"></ngx-loading>


    <div class="alert alert-danger" *ngIf="error">
      Le compte utilsateur demandé est introuvable
    </div>




  `,
  styles: [
    `




    `
  ]
})
export class LoginComponent implements OnInit {
  public loading = false;
  submitted = false;
  error = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth : AuthService,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      this.loading=false;
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (data) => {
        // this.ui.setLoading(false);
        this.loading=false;
        this.error = false;

        this.router.navigateByUrl('/products');

      },
      (error) => {
        this.loading=false;
        this.error = true;

      }
    );

    this.error = false;
  }

}
