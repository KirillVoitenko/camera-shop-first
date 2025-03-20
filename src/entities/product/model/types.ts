export enum ProductType {
  Collection = 'Коллекционная',
  Momental = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

export enum ProductCategory {
  VideoCamera = 'Видеокамера',
  PhotoCamera = 'Фотоаппарат'
}

export enum RecommendedUserLevel {
  Beginner = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный'
}

export interface Product {
  id: number;
  name: string;
  vendorCode: string;
  type: ProductType;
  category: ProductCategory;
  description: string;
  level: RecommendedUserLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
