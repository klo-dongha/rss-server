import express, { Request, Response, NextFunction, Router } from 'express';
import AccountService from '~/service/account/account.service';

export default class AccountController {
  public router: Router = express.Router();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post('/login', this.login);
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, userPassword } = req.body;

      const accountService = new AccountService();
      const result = await accountService.login(userId, userPassword);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
