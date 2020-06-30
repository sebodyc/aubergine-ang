import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Conversation} from "./conversation";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http:HttpClient) { }

  findConversation(): Observable<Conversation[]>{

    return this.http
      .get(environment.apiUrl + '/conversations', {})
      .pipe(map((data) => data['hydra:member'] as Conversation[]));
  }


}
