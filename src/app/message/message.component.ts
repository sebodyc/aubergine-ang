import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Conversation} from "../conversation/conversation";
import {Message} from "./message";

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
  `,
  styles: [
  ]
})
export class MessageComponent implements OnInit {
  messages: Message []=[];

  constructor(private service : MessageService) { }

  ngOnInit(): void {

    this.service
      .findMessage()
      .subscribe((message)=>(this.messages=message));
  }

}
