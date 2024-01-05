import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
    {path: 'books', component: BookListComponent},
    // {pathMatch: 'full', redirectTo: 'books'}
    { path: '**', redirectTo: 'books' }
];
