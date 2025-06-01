export enum AppRoutesEnum {
  Main = '/',
  Product = '/camera/:productId',
  NotFound = '/404',
  Guaranties = '/guaranties',
  Delivery = '/delivery',
  About = '/about',
  Basket = '/card'
}

export enum ServerRoutesEnum {
  Products = '/cameras',
  Product = '/cameras/:cameraId',
  Comments = '/cameras/:cameraId/reviews',
  SimilarProducts = '/cameras/:cameraId/similar',
  Orders = '/orders',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons'
}

export enum MouseButtonEnum {
  Main = 0,
  Auxiliary = 1,
  Secondary = 2,
  Fourth = 3,
  Fifth = 4
}

export enum RatingValue {
  Terrible = 1,
  Bad = 2,
  Normal = 3,
  Good = 4,
  Excellent = 5,
}

export enum RatingCaption {
  Terrible = 'Ужасно',
  Bad = 'Плохо',
  Normal = 'Нормально',
  Good = 'Хорошо',
  Excellent = 'Отлично',
}
