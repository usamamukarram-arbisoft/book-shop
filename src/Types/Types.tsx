export interface Books {
  bookId: number;
  title: string;
  description: string;
  author: string;
  category: string;
  image_url: string;
  available_books: number;
  price_usd: number;
  pages: number;
}

export interface PaginationProps {
  sampleProducts: Books[];
  onPageChange: (updatedBooks: Books[]) => void;
}

export interface ProductCardProps {
  product: Books;
}
