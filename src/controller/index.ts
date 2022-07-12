import express, { Router } from 'express';
import NewsController from '~/controller/news/news.controller';

export default class Controller {
  public router: Router = express.Router();
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      // this.configureSwaggerUi()
    }
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.use('/news', new NewsController().router);
  }

  private configureSwaggerUi() {
    // SwaggerUi.configurue(this.router)
  }
}
