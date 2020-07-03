import { Component, OnInit } from '@angular/core';
import {ConversationService} from "./conversation.service";
import {Observable} from "rxjs";
import {Conversation} from "./conversation";
import {User} from "../auth/user";

@Component({
  selector: 'app-conversation',
  template: `
    <div  *ngFor="let c of conversations">
      <h1>Mes conversations</h1>
      <h4>Annonce n° {{  c.id }} : {{ c.product.title }} </h4>
    <tr>
      <td> Nom de l'acheteur :{{ c.buyer.name }}</td>
      <td> Messages :{{ c.messages.content }}</td>
      <td>{{ c.messages.sender }}</td>
      </tr>
    </div>

  `,
  styles: [
  ]
})
export class ConversationComponent implements OnInit {
  conversations: Conversation []=[];


  constructor(private service:ConversationService) { }

  ngOnInit(): void {

    this.service
      .findConversation()
      .subscribe((conversation)=>(this.conversations=conversation));
    console.log(this.conversations);
  }


}
