import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Conversation} from "../conversation/conversation";
import {Message} from "./message";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UiService} from "../ui/ui.service";
import {log} from "util";

@Component({
  selector: 'app-message',
  template: `

    <div class="backpics">
      <div class="card-header">
        <h3>{{pId}}</h3>
      </div>
      <div class="card-body" >
        <ul class="list-group" *ngFor="let m of messages">
          <li class="list-group-item texthome" style="margin-bottom:6px;">
            <div class="media">
              <div class="media-body">
                <div class="media" >
                  <div class="media-body" >
                    <div class="row">
                      <div class="col-md-12">
                        <p><strong>{{ m.sender.name }}</strong> :  {{ m.content }} <br /><small class="text-muted">{{ m.createdAt | date :'short' }}</small></p>
                        <p> </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <form [formGroup]="form" (ngSubmit)="handleSubmit()" >
          <div class="form-group ">
            <input
              type="text"
              class="form-control texthome"
              formControlName="content"
              placeholder="Votre message"
            >
          </div>
          <button type="submit" class="btn btn-success">envoyer</button>
        </form>
      </div>

    </div>


  `,
  styles: [
    `
      .backpics{
        background-image: url("../../assets/images/road.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        margin: auto;
        font-size: 1.2rem;
        padding: 1rem;
      }
      .texthome{

        background-color: rgba(255,255,255,0.6);

      }
    `
  ]
})
export class MessageComponent implements OnInit {

  submitted = false;
  messages: Message []=[];
  const // @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');
  pId= +this.route.snapshot.paramMap.get('pId');


  form = new FormGroup({
    content: new FormControl(''),
    conversation: new FormControl("/api/conversations/" +this.id),
    annonceId: new FormControl(this.pId),

  });



  constructor(private service : MessageService, private router : Router , private route : ActivatedRoute,private ui:UiService) { }

  ngOnInit(): void {

    // this.service
    //   .findMessage()
    //   .subscribe((message)=>(this.messages=message));
    // this.form.patchValue({"annonceId" : this.pId})
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
          // this.router.navigateByUrl('/profile');
          location.reload();
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
