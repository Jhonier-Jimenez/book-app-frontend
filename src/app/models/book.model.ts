export interface Book {
  id: string;
  title: string;
  author_id: string;
  read: boolean;
}

export interface Author {
  id: string;
  name: string;
}
