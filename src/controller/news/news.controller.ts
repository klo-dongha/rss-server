import express, { Request, Response, NextFunction, Router } from 'express';
import RssService from '~/service/news/rss.service';

export default class NewsController {
  public router: Router = express.Router();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get('/sample-rss', this.getSampleRss);
    this.router.get('/sample-rss-copyright', this.getSampleRssCopyright);
    this.router.get('/sample-scrapping', this.getSampleScrapping);
    this.router.post('/rss', this.setRss);
  }

  private async getSampleRss(req: Request, res: Response, next: NextFunction) {
    try {
      const rssUrl = req.query.rssUrl as string;

      const rssService = new RssService();
      const result = await rssService.getSampleRssOne(rssUrl);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  private async getSampleRssCopyright(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const copyright = req.query.copyright as string;

      if (copyright) {
        const rssService = new RssService();
        const result = await rssService.getSampleRssCopyright(copyright);
        res.status(200).json(result);
      } else {
        res.status(200).json(null);
      }
    } catch (err) {
      next(err);
    }
  }

  private async getSampleScrapping(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const scrappingUrl = req.query.scrappingUrl as string;

      const rssService = new RssService();
      const result = await rssService.getSampleScrapping(scrappingUrl);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  private async setRss(req: Request, res: Response, next: NextFunction) {
    try {
      const rssService = new RssService();
      await rssService.setRss();
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}
