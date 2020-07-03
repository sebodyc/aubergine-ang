import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Conversation} from "../conversation/conversation";
import {Message} from "./message";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UiService} from "../ui/ui.service";

@Component({
  selector: 'app-message',
  template: `
    <div  *ngFor="let m of messages ">
      <tr>
        <td>{{ m.createdAt }}</td>
        <td>{{ m.content }}</td>
        <td>{{ m.sender.name }}</td>
      </tr>

    </div>


    <h1>Repondre</h1>

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
export class MessageComponent implements OnInit {
  submitted = true;
  messages: Message []=[];
  const // @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');

  form = new FormGroup({
    content: new FormControl(''),
    conversation: new FormControl("/api/conversations/" +this.id),

  });



  constructor(private service : MessageService, private router : Router , private route : ActivatedRoute,private ui:UiService) { }

  ngOnInit(): void {

    // this.service
    //   .findMessage()
    //   .subscribe((message)=>(this.messages=message));

    this.service.findMessagesInConversation(this.id)
      .subscribe(message=>this.messages=message);
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
