import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import Controller from './controller';

class ExpressApp {
  public app = express();
  public port = 3000;

  constructor() {
    this.setMiddleware();
    this.setController();
    // this.setErrorHandler();
  }

  // 컨트롤러 설정
  private setController() {
    // this.app.use('/assets', express.static(ConfigManager.config.path.assets))
    this.app.use('/api', new Controller().router);
    this.app.use('/', express.static(__dirname + '/dist'));
  }

  private setMiddleware() {
    this.app.set('case sensitive routing', true);
    this.app.set('case sensitive routing', true);
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(express.json({ limit: '50mb' }));
    // this.app.use(cookieParser())
    this.app.set('trust proxy', true);

    // 헤더 설정
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS, PATCH'
      );
      res.header('Cache-Control', 'no-cache');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
      );
      next();
    });

    // Cors
    // this.app.use(
    //   cors({
    //       origin: [...Object.values(ConfigManager.config.url)],
    //       credentials: true,
    //   })
    // )

    // 보안 처리
    // this.app.use(helmet())
  }

  // private setErrorHandler() {
  //   this.app.use(ErrorMiddleware.middleware)
  // }

  run() {
    try {
      this.app.listen(this.port, () => {
        console.log(`express app listening (http://127.0.0.1:${this.port})`);
      });
    } catch (err) {
      throw err;
    }
  }
}

export default ExpressApp;
