import { Request, Response, NextFunction } from 'express';
import AuthService from '~/utils/auth.service';

export default class Authentication {
  // jwt 생성
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    console.log('Authentication.authenticate in!');

    // exclude url 설정
    // const authService = new AuthService();
    // const accessToken: string = await authService.createAccessToken('123');
    // console.log('accessToken', accessToken);

    next();
  }
  // 토큰 유효성 검사 및 IP 변조 검사

  //
}
