import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import Document from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
      {
        id: 1,
        name: 'test1',
        url: 'test.com',
        description: 'A test of the app',
        children: ''
      },
      {
        id: 2,
        name: 'test2',
        url: 'test.com',
        description: 'A test of the app',
        children: ''
      },
      {
        id: 3,
        name: 'test3',
        url: 'test.com',
        description: 'A test of the app',
        children: ''
      },
      {
        id: 4,
        name: 'test4',
        url: 'test.com',
        description: 'A test of the app',
        children: ''
      },
      {
        id: 5,
        name: 'test5',
        url: 'test.com',
        description: 'A test of the app',
        children: ''
      }
    ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  constructor() { }

  ngOnInit(): void {
    
  }
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
