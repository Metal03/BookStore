import { BookInterface } from './../models/book';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private bookColletions: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.bookColletions = afs.collection<BookInterface>('books');
    this.books = this.bookColletions.valueChanges();
  }

  getAllBooks() {
    return this.books = this.bookColletions.snapshotChanges()
           .pipe(map( changes => {
              return changes.map( action => {
                const data = action.payload.doc.data() as BookInterface;
                data.id = action.payload.doc.id;
                return data;
              });
           }));
  }
  addBook() {

  }
  updateBook() {

  }
  deleteBook() {

  }
}
