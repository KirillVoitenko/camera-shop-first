export enum AppRoutesEnum {
  Main = '/',
  Product = '/camera/:productId',
  NotFound = '/404',
  Guaranties = '/guaranties',
  Delivery = '/delivery',
  About = '/about'
}

export enum ServerRoutesEnum {
  Products = '/cameras',
  Product = '/cameras/:cameraId',
  Comments = '/cameras/:cameraId/reviews',
  SimilarProducts = '/cameras/:cameraId/similar',
  Orders = '/orders',
  Promo = '/promo',
}
