import { Injectable } from '@angular/core';
import { Author, Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:8000/api';
  private books: Book[] = [
    { id: '1', title: 'Book 1', author_id: 'Author 1', read: false },
    { id: '2', title: 'Book 2', author_id: 'Author 2', read: false },
    // Add more books as needed
  ];

  private authors: Author[] = [
    { id: '1', name: 'Author 1' },
    { id: '2', name: 'Author 2' },
    { id: '3', name: 'Author 3' },
  ];

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getAuthors(): Observable<Author[]> {
    
    return this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  addBook(book: Book): Observable<Book> { 
    
    
    return this.http.post<Book>(`${this.apiUrl}/book`, book);
  }

  updateBook(updatedBook: Book): Observable<Book> {

    const url = `${this.apiUrl}/book/${updatedBook.id}`;
    return this.http.put<Book>(url, updatedBook);
     
  }

  deleteBook(id: string): Observable<void> { 
  
    const url = `${this.apiUrl}/book/${id}`;
    return this.http.delete<void>(url); 
  }
}
