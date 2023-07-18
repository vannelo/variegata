export interface Product {
  id: string;
  photoId: number;
  price: number;
  salePrice: number;
  name: string;
  store: string;
}

export interface productsPaginationData {
  length: number;
  pageActive: number;
}

export interface Store {
  id: string;
  photoId: number;
  name: string;
}
