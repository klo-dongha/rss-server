import express, { Router } from 'express';
import NewsController from '~/controller/news/news.controller';
import AccountController from '~/controller/account/account.controller';
import Authentication from '~/middlewares/authentication';

export default class Controller {
  public router: Router = express.Router();
  constructor() {
    this.ConfigureMiddleware();
    this.configureRoutes();
    if (process.env.NODE_ENV === 'development') {
      // this.configureSwaggerUi()
    }
  }

  private configureRoutes() {
    this.router.use('/account', new AccountController().router);
    this.router.use('/news', new NewsController().router);
  }

  private configureSwaggerUi() {
    // SwaggerUi.configurue(this.router)
  }

  private ConfigureMiddleware() {
    this.router.use(Authentication.authenticate);
  }
}
