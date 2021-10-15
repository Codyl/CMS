import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  providers: []
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = '7';
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const m: Message = {
      id: 12,
      sender: this.currentSender,
      subject: subject,
      msgText: msgText
    };
    this.messageService.addMessage(m);
  }

  onClear() {
    //TODO find better implimentation
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
