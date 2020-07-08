import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {UserService} from "./user.service";


@Component({
  selector: 'app-register',
  template: `
    <div class="backpics">
    <div class="container-fluid cont texthome">
    <h1>Inscription</h1>
    <div class="alert alert-info" *ngIf="loading">en cour chargement ...</div>
    <div class="alert alert-danger" *ngIf="error">
      Une erreur est survenue merci de reesayer plus tard
    </div>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          formControlName="name"
          type="text"
          class="form-control"
          [class.is-invalid]="getErrorForControl('name')"
          placeholder="Nom complet (ex: Robert )"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('name')">
          {{ getErrorForControl('name') }}
        </p>
      </div>

      <div class="form-group">
        <input
          formControlName="firtsName"
          type="text"
          class="form-control"
          [class.is-invalid]="getErrorForControl('firtsName')"
          placeholder="prenom (ex: Robert )"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('firtsName')">
          {{ getErrorForControl('firtsName') }}
        </p>
      </div>

      <div class="form-group" >
        <input
          formControlName="email"
          type="email"
          class="form-control"
          [class.is-invalid]="getErrorForControl('email')"
          placeholder="Adresse email"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('email')">
          {{ getErrorForControl('email') }}
        </p>
      </div>

      <div class="form-group">
        <input
          formControlName="adress"
          type="text"
          class="form-control"
          [class.is-invalid]="getErrorForControl('adress')"
          placeholder="adresse (ex: Rue de la paix )"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('adress')">
          {{ getErrorForControl('adress') }}
        </p>
      </div>
      <div class="form-group">
        <input
          formControlName="zipCode"
          type="number"
          class="form-control"
          [class.is-invalid]="getErrorForControl('zipCode')"
          placeholder="Code postal(ex: 13100 )"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('zipCode')">
          {{ getErrorForControl('zipCode') }}
        </p>
      </div>
      <div class="form-group">
        <input
          formControlName="password"
          type="password"
          class="form-control"
          [class.is-invalid]="getErrorForControl('password')"
          placeholder="Mot de passe"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('password')">
          {{ getErrorForControl('password') }}
        </p>
      </div>

      <button class="btn btn-success">Je m'inscris</button>
    </form>
    </div>
    </div>

  `,
  styles: [
    `
      .cont {
        padding: 3rem 5rem 3rem;
      }

      .backpics {
        background-image: url("../../assets/images/a.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }

      .texthome {
        background-color: rgba(255, 255, 255, 0.8);
        color: black;
        margin: 3rem auto;

        padding: 2rem 2rem;
      }
    `
  ]
})
export class RegisterComponent implements OnInit {

  form  = new FormGroup({

    name: new FormControl(''),
    firtsName: new FormControl(''),
    adress: new FormControl(''),
    zipCode: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),

  });

  submitted = false;
  loading = false;
  error = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  getErrorForControl(controlName: string) {
    return this.form.controls[controlName].getError('invalid');

  }

  handleSubmit() {
    this.loading = true;
    this.error = false;
    this.userService.create(this.form.value).subscribe(
      (user) => {
        console.log(user);
        this.loading = false;
        this.error = false;
        this.router.navigateByUrl('/products');
      },

      (error: HttpErrorResponse) => {
        this.loading = false;

        if (error.status == 400 && error.error.violations) {
          for (const violation of error.error.violations) {
            const nomDuChamp = violation.propertyPath;
            const message = violation.message;

            this.form.controls[nomDuChamp].setErrors({
              invalid: message,
            });
          }
          this.error = false;
          return;
        }
        this.error = true;
      }
    );
  }

}
