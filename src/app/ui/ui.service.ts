import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public flash = new Subject<{ type: string; message: string }>();
  public loadingSubject = new Subject<boolean>();


  constructor() { }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  addFlash(type: string, message: string) {
    this.flash.next({
      type: type,
      message: message,
    });
  }

  fillViolationInForm(form: FormGroup, violations: ApiViolation[]) {
    for (const violation of violations) {
      const nomDuChamp = violation.propertyPath;
      const message = violation.message;

      form.controls[nomDuChamp].setErrors({
        invalid: message,
      });
    }
  }
}

interface ApiViolation {
  propertyPath: string;
  message: string;
}

