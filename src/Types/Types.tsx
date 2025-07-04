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
  quantity: number;
  totalPrice: number;
}

export interface PaginationProps {
  sampleProducts: Books[];
  onPageChange: (updatedBooks: Books[]) => void;
}

export interface ProductCardProps {
  product: Books;
  setOpenDialog: (open: boolean) => void;
}

export interface User {
  email: string;
  password: string;
  username: string;
}
export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

export type cartItemProps = {
  item: Books;
};
export type cartSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  goToCheckout: () => void;
};

export type confirmationProps = {
  openDialog: boolean;
  title: string;
  message: string;
  IsDisplayBtn: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
};
export type CartItem = {
  books: Books;
};

export interface AddToCartState {
  items: CartItem["books"][];
  openDrawer: boolean;
  error: string;
}
export interface usersInterface {
  password: string;
  email: string;
}
export type MenuItem = {
  name: string;
  link: string;
};
