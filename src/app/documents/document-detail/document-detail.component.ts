import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import Document from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  private windref: WindRefService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params.id;
        const doc: Document = this.documentService.getDocument(id);
        this.document = doc;
      }
    );
    this.nativeWindow = this.windref.getNativeWindow()
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteElement(this.document);
    this.router.navigate(['/documents']);
  }

}
