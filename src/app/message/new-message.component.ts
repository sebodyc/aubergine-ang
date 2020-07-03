import { Component, OnInit } from '@angular/core';
import {Message} from "./message";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "./message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../ui/ui.service";

@Component({
  selector: 'app-new-message',
  template: `
    <h1>Creer un message</h1>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()" >
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          formControlName="content"
          placeholder="Votre message"
        >
      </div>
      <button type="submit" class="btn btn-success">envoyer</button>
    </form>
  `,
  styles: [
  ]
})
export class NewMessageComponent implements OnInit {
  submitted = true;
  messages: Message []=[];

  id: number;

  form = new FormGroup({
    content: new FormControl(''),
    annonceId: new FormControl(''),

  });

  constructor(private service : MessageService, private router : Router , private route : ActivatedRoute,private ui:UiService) { }

  ngOnInit(): void {
    this.id= +this.route.snapshot.paramMap.get('id');
    this.form.patchValue({"annonceId" : this.id})
  }

  handleSubmit(){
    console.log(this.form.value);
    this.submitted = true;
    this.service
      .sendMessage(this.form.value )
      .subscribe(
        (invoice) => {
          this.router.navigateByUrl('/profile');
        },
        (error) => {
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationInForm(this.form, error.error.violations);
            return;
          }
        }
      );
  }

}
