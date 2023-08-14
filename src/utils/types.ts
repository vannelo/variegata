type ProductPhoto = {
  url: string;
};

export interface Product {
  id: string;
  photoId: number;
  price: number;
  salePrice: number;
  name: string;
  description?: string;
  store: string;
  photos: ProductPhoto[];
}

export interface ProductsPaginationData {
  length: number;
  pageActive: number;
}

export interface Store {
  id: string;
  photoId: number;
  name: string;
}
