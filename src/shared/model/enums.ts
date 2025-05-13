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
}

export enum MouseButtonEnum {
  Main = 0,
  Auxiliary = 1,
  Secondary = 2,
  Fourth = 3,
  Fifth = 4
}
