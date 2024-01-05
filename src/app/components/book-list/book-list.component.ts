import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from '../book-form/book-form.component';

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

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.loadBooks();
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
    this.updateScreen();
  }

  updateScreen() {
    this.isOpenForm = false;
    this.loadBooks();
  }

  cancel() {
    this.isOpenForm = false;
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
    
    this.bookService.deleteBook(id).subscribe(
      () => {
        this.books = this.books.filter((book) => book.id !== id);
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  } 
}
