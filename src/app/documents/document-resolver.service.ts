// import { RecursiveTemplateAstVisitor } from "@angular/compiler";
// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { DocumentService } from "./document.service";

// @Injectable({ providedIn: 'root' })
// export class DocumentResolverService implements Resolve<Document[]> {
//   constructor(private documentService: DocumentService) {
    
//   }
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const documents = this.documentService.getDocuments();
//     if (documents.length === 0) {
//       return this.documentService.fetchDocuments();
//     }
//     else {
//       return documents;
//     }
//   }
// }