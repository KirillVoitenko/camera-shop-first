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

interface ProductPreview {
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export interface Product extends ProductPreview {
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
}

export interface PromoProduct extends ProductPreview {
  id: number;
  name: string;
}

export type CardTab = 'characteristics' | 'description';

export type ProductCardSearchParams = {
  activeTab: CardTab;
};
