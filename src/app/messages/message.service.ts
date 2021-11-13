import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Message from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  private messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new Subject<Message[]>();
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.http
      .get<Message[]>(
        'https://cms-project-232cf-default-rtdb.firebaseio.com/messages.json'
      )
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
    this.messages.push(message);
    this.storeMessages();
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
      .put(
        'https://cms-project-232cf-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers: header }
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
