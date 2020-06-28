import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <h1>Connection</h1>
    <div class="alert alert-danger" *ngIf="error">
      Le compte utilsateur demandé est introuvable
    </div>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          [class.is-invalid]="form.controls['username'].invalid"
          type="email"
          placeholder="adresse email de connexion"
          formControlName="username"
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
      <div class="form-group">
        <input
          [class.is-invalid]="form.controls['password'].invalid"
          type="password"
          placeholder="mots de passe"
          formControlName="password"
        />
        <p
          class="invalid-feedback"
          *ngIf="submitted && form.controls['password'].hasError('required')"
        >
          Mot de passe obligatoire
        </p>
      </div>
      <button class="btn btn-success">Connexion</button>
    </form>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

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
    this.submitted = true;


    if (this.form.invalid) {
      return;
    }

    // this.ui.setLoading(true);

    this.auth.authenticate(this.form.value).subscribe(
      (data) => {
        // this.ui.setLoading(false);
        this.error = false;

        this.router.navigateByUrl('/products');
      },
      (error) => {
        this.error = true;
      }
    );

    console.log(this.form.value);
    console.log(this.auth.getToken());
    this.error = false;
  }

}
