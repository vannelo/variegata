type ProductPhoto = {
  url: string;
};

type Bid = {
  amount: number;
  timestamp: string;
};
export interface Product {
  id: string;
  photoId: number;
  price: number;
  salePrice: number;
  name: string;
  description?: string;
  store: Store;
  photos: ProductPhoto[];
}

export interface Auction extends Product {
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
