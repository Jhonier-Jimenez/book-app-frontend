import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author, Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit{
  @Output() addBook = new EventEmitter<Book>();
  @Output() cancelEvent = new EventEmitter<void>();
  @Input() isEditMode!: boolean;
  @Input() bookEditing!: Book;
  
  authors: Author[] = [];
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookService: BooksService) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author_id: ['', Validators.required],
      read: [false],
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
    if (this.isEditMode) {
      this.bookForm.get('title')?.setValue(this.bookEditing.title);
      this.bookForm.get('author_id')?.setValue(this.bookEditing.author_id);
      this.bookForm.get('read')?.setValue(this.bookEditing.read);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      let newBook: Book = {
        ...this.bookForm.value
      };

      if (this.isEditMode) {
        newBook = {id: this.bookEditing.id, ...this.bookForm.value}
        this.updateBook(newBook);
      } else {
        this.createBook(newBook);
      }

      // this.addBook.emit(newBook);
      this.bookForm.reset();
    }
  }

  loadAuthors(): void {
    
     this.bookService.getAuthors().subscribe(
      (authors) => {
        this.authors = authors;
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    ); 
  } 


  createBook(newBook: Book): void {
    
    this.bookService.addBook(newBook).subscribe(
      (addedBook) => {
        this.addBook.emit(addedBook);
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  } 

   updateBook(updatedBook: Book): void {
     
    this.bookService.updateBook(updatedBook).subscribe(
      () => {
        this.addBook.emit(updatedBook);
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  } 
}
