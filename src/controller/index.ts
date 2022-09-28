import express, { Router } from 'express';
import NewsController from '~/controller/news/news.controller';
import AccountController from '~/controller/account/account.controller';

export default class Controller {
  public router: Router = express.Router();
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      // this.configureSwaggerUi()
    }
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.use('/account', new AccountController().router);
    this.router.use('/news', new NewsController().router);
  }

  private configureSwaggerUi() {
    // SwaggerUi.configurue(this.router)
  }
}
