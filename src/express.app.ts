import Controller from './controller';
import ErrorMiddleware from './middlewares/error.middleware';
import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class ExpressApp {
  public app = express();
  public server: any = null;
  public port = 3000;

  constructor() {
    this.setMiddleware();
    this.setController();
    this.setErrorHandler();
  }

  // 컨트롤러 설정
  private setController() {
    // this.app.use('/assets', express.static(ConfigManager.config.path.assets))
    this.app.use('/api', new Controller().router);
    this.app.use('/', express.static(__dirname + '/dist'));
  }

  private setMiddleware() {
    this.app.set('case sensitive routing', true); // url 대소문자 구분 활성화
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(express.json({ limit: '50mb' }));
    // this.app.use(cookieParser())
    // this.app.set('trust proxy', true);

    // 헤더 설정
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', req.headers.origin);
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
    this.app.use(cookieParser());
    // Cors
    this.app.use(
      cors({
        origin: [
          'http://127.0.0.1:3001',
          'http://localhost:3001',
          'http://local.rss.co.kr:3000',
        ],
        credentials: true,
      })
    );

    // 보안 처리
    this.app.use(helmet());

    this.app.use(
      morgan(process.env.NODE_ENV !== 'development' ? 'combined' : 'dev', {
        stream: {
          write: (message) => {
            console.log(message.trim());
            // Logger.webLogger.info(message.trim());
          },
        },
      })
    );
  }

  private setErrorHandler() {
    this.app.use(ErrorMiddleware.middleware);
  }

  run() {
    return new Promise<Server>((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, () => {
          console.log(`express app listening (http://127.0.0.1:${this.port})`);
          resolve(this.server);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  close() {
    return new Promise<void>((resolve, reject) => {
      this.server.close((err: any) => {
        if (err) {
          reject(err);
        } else resolve();
      });
    });
  }
}

export default ExpressApp;
