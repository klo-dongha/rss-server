import CustomError from '~/utils/customError';
import Logger from '~/utils/logger';
import { Request, Response, NextFunction } from 'express';

export default class ErrorMiddleware {
  public static middleware(
    error: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const member = res.locals.member;
    const ip = res.locals.ip;
    console.error(error);
    if (error.constructor === CustomError) {
      Logger.customErrorLogger.info({ error, ip, member });
      res.status(500).json(error);
    } else {
      Logger.unknownErrorLogger.error({
        error,
        ip,
        member,
        position: 'error.middleware.ts',
      });
      res.status(500).json(new CustomError());
    }
  }
}
