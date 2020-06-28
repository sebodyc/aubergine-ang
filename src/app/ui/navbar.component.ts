import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  template: `
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" routerLink="/">L'Aubergine</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>





  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" routerLink="/products" routerLinkActive="active">Toutes Les Annonces <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/product/create" routerLinkActive="active">Déposer une annonce</a>
      </li>

    </ul>

    <ul class="navbar-nav ml-auto">
      <ng-container *ngIf="!isAuthenticated">
        <li class="nav-item">
          <a
            class="nav-link"
            routerLink="/register"
            routerLinkActive="active"
          >Inscription
          </a>
        </li>
        <li class="nav-item">
          <a
            class="btn btn-primary"
            routerLink="/login"
            routerLinkActive="active"
          >
            Connexion</a
          >
        </li>
      </ng-container>
      <li class="nav-item" *ngIf="isAuthenticated">
        <button class="btn btn-warning" (click)="handleLogout()">
          Deconnexion
        </button>
      </li>

    </ul>

  </div>
</nav>

  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.auth.authChanged.subscribe((value) => {
      if (!value && this.isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
      this.isAuthenticated = value;
    });
  }

  handleLogout() {
    this.auth.logout();
  }

}
