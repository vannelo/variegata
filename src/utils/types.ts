export interface Product {
  id: string;
  uuid: string;
  photoId: number;
  price: number;
  salePrice: number;
  name: string;
  store: string;
}

export interface ProductsPaginationData {
  length: number;
  pageActive: number;
}

export interface Store {
  id: string;
  uuid: string;
  photoId: number;
  name: string;
}
