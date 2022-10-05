import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import ConfigManager from '~/config';

export default class Logger {
  private static path = ConfigManager.config.path.logs;

  public static webLogger = winston.createLogger({
    format: winston.format.printf((info) => info.message),
    transports: [
      new WinstonDaily({
        filename: `${Logger.path}/weblog/ex%DATE%_${
          process.env.MY_NODE_NAME || ''
        }.log`,
      }),
    ],
  });

  public static customErrorLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json()
    ),
    defaultMeta: { service: 'rss_server' },
    transports: [
      new WinstonDaily({
        filename: `${Logger.path}/customError/customError_%DATE%_${
          process.env.MY_NODE_NAME || ''
        }.log`,
      }),
    ],
  });

  public static unknownErrorLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format((info, opts) => {
        if ((info.message as any).error) {
          const error = (info.message as any).error;
          (info.message as any).error = {
            name: error?.name,
            message: error?.message,
            stack: error?.stack,
            text: error.toString ? error.toString() : JSON.stringify(error),
          };
        }
        return info;
      })(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json()
    ),
    defaultMeta: { service: 'rss_server' },
    transports: [
      new WinstonDaily({
        filename: `${Logger.path}/unknownError/unknownError_%DATE%_${
          process.env.MY_NODE_NAME || ''
        }.log`,
        handleRejections: process.env.NODE_ENV === 'development' ? false : true,
        handleExceptions: process.env.NODE_ENV === 'development' ? false : true,
      }),
    ],
  });
}
