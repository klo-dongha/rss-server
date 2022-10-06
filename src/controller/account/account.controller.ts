import express, { Request, Response, NextFunction, Router } from 'express';
import AccountService from '~/service/account/account.service';
import validator from '~/utils/validator';

export default class AccountController {
  public router: Router = express.Router();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post(
      '/login',
      validator.validation(
        {
          userId: {
            type: validator.joi.string(),
            // itemErrorMessage: '아이디를 입력해주세요.',
          },
          userPassword: {
            type: validator.password,
            // itemErrorMessage: '패스워드를 입력해주세요.',
          },
        },
        '아이디 및 패스워드를 확인해주세요.'
      ),
      this.login
    );
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, userPassword } = req.body;
      // 로그인 여부 확인

      // 로그인 로직 실행
      const accountService = new AccountService();
      const result = await accountService.login(userId, userPassword);

      // 토큰 쿠키 발행(auid: access token, ruid: refresh token)

      // 세션쿠키 발행
      res
        .status(200)
        .cookie('auid', result.accessToken, {
          httpOnly: false,
        })
        .cookie('ruid', result.refreshToken, {
          // 로그인 유지기능 사용시 도메인쿠키 30일
          httpOnly: true,
        })
        .json({ result: true });
      // res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
