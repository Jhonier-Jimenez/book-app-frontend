import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from '../book-form/book-form.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isOpenForm = false;
  isEditMode = false;
  bookToUpdate!: Book;
  authors:any = {};

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  addBook(): void {
    this.isEditMode = false;
    this.isOpenForm = true;
  }

  updateBook(book: Book): void {
    this.isEditMode = true;
    this.bookToUpdate = book;
    this.isOpenForm = true;
  }

  deleteBook(id: string): void {
    this.deleteBookFromDB(id);
  }

  updateScreen() {
    this.isOpenForm = false;
    this.loadBooks();
  }

  cancel() {
    this.isOpenForm = false;
  }



  loadAuthors(): void {
    this.bookService.getAuthors().subscribe(
      (authors) => {
        authors.forEach(author => {
          this.authors[author.id] = author.name;
        });;
      },
      (error) => {
        console.error('Error loading authors:', error);
      }
    ); 
  }

  loadBooks(): void {
    
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    ); 
  }


  deleteBookFromDB(id: string): void {
    
    this.bookService.deleteBook(id).pipe(finalize(()=>this.updateScreen())).subscribe();
    
  } 
}
