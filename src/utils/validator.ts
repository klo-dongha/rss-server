import Joi from 'joi';
import CustomError from './customError';
import { Request, Response, NextFunction } from 'express';

const joiDefault = Joi;
const validation =
  (reqSchema: any, errorMessage: string = '검증 오류') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const way = req.method === 'GET' ? 'query' : 'body';
    // console.log('reqSchema', reqSchema);
    console.log('errorMsg', errorMessage);

    const types: any = {};
    for (const key in reqSchema) {
      types[key] = reqSchema[key].type;
    }

    const schema = Joi.object(types);
    // 검증 항목 중 최초로 검증 실패된 항목만 리턴함
    // (id, pwd 둘 다 틀리다면 id만 리턴)
    schema
      .validateAsync({ ...req[way] })
      .then(() => {
        next();
      })
      .catch((err) => {
        const errorItem = err.details[0].path[0];
        const detailMessage = reqSchema[errorItem]?.itemErrorMessage;
        res.status(422).json(new CustomError(errorMessage, 0, detailMessage));
      });
  };

const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

export default {
  joi: joiDefault,
  validation,
  password,
};
