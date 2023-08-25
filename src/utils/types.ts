type ProductPhoto = {
  url: string;
};

export type Bid = {
  amount: number;
  timestamp: string;
};
export interface ProductBase {
  id: string;
  price: number;
  name: string;
  description?: string;
  store: Store;
  photos: ProductPhoto[];
}

export interface Product extends ProductBase {
  salePrice: number;
}
export interface Auction extends ProductBase {
  endTime: string;
  bids: Bid[];
}

export interface ProductsPaginationData {
  length: number;
  pageActive: number;
}

export interface Store {
  name: string;
  slug: string;
  description: string;
  logo: string;
  facebook?: string;
  instagram?: string;
  phone?: string;
  products: Product[];
}
