import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import ApiErrors from '../utils/apiErrors';
import globalErrors from '../middlewares/globalErrors';
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';
import authRoute from './authRoute';
import couponsRoute from './couponsRoute';
import wishlistRoute from './wishlistRoute';
import addressRoute from './addressRoute';
import reviewsRoute from './reviewsRoute';



const mountRoutes = (app:Application) => {
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   res.cookie('cookies', req.csrfToken());
  //   next();
  // });
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategories', subcategoriesRoute);
      app.use('/api/v1/products', productsRoute);
  app.use('/api/v1/coupons', couponsRoute)
  app.use('/api/v1/reviews', reviewsRoute)
  app.use('/api/v1/users', usersRoute)
  app.use('/api/v1/wishlist', wishlistRoute)
  app.use('/api/v1/address', addressRoute)        
  app.use('/api/v1/auth', authRoute);
    app.all('*',(req: Request, res: Response, next: NextFunction) => {
        return next( new ApiErrors(`this route ${req.originalUrl} not found`, 400 ))
    })
    app.use(globalErrors)


}


export default mountRoutes;