import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conversation} from "../conversation/conversation";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  findMessage(): Observable<Message[]>{

    return this.http
      .get(environment.apiUrl + '/messages/', {})
      .pipe(map((data) => data['hydra:member'] as Message[]));
  }
}
