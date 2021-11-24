import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Message from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnDestroy {
  private messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new Subject<Message[]>();
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.http
      .get<Message[]>('http://localhost:3000/messages')
      .subscribe(
        (messages: Message[]) => {
          console.log(messages);
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; Message: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.Message);
      });
  }
  getMaxId() {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  storeMessages() {
    const messages = JSON.stringify(this.messages);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/messages', messages, { headers: header })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
