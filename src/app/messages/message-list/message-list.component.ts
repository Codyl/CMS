import { Component, OnInit } from '@angular/core';
import Message from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    {
      id: 1,
      sender: 'tester',
      subject: 'subject',
      msgText: 'msgText'
    },
    {
      id: 2,
      sender: 'tester2',
      subject: 'subject1',
      msgText: 'msgText1'
    },
    {
      id: 3,
      sender: 'tester',
      subject: 'subjecter',
      msgText: 'msgTexter'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
