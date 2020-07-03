import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MessageComponent} from "../../message/message.component";
import {NewMessageComponent} from "../../message/new-message.component";
import {ProductEditComponent} from "../../products/product-edit.component";
import {ProductCreateComponent} from "../../products/product-create.component";

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements  CanDeactivate<unknown> {

  canDeactivate(
    component: MessageComponent | NewMessageComponent | ProductEditComponent | ProductCreateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.submitted) {
      return true;
    }

    return window.confirm(
      "Vous n'avez pas fini de renseigner le formulaire  voulez vous vraiment partir ??"
    );
  }
}
