import jwt from 'jsonwebtoken';
import { TokenContent } from '~/type/auth';

export default class AuthService {
  /**
   * Access Token 발급
   * @param {string} userId
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  async createAccessToken(userId: string): Promise<string> {
    const secretKey = 'secretKey'; // 추후 키 매니저를 사용하여 불러오기
    const tokenContent: TokenContent = {
      expiresIn: '30m',
    };
    const accessToken: string = jwt.sign({ userId }, secretKey, tokenContent);

    return accessToken;
  }

  /**
   * Refresh Token 발급
   * @param {string} userId
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  async createRefreshToken(userId: string): Promise<string> {
    const secretKey = 'secretKey'; // 추후 키 매니저를 사용하여 불러오기
    const tokenContent: TokenContent = {
      expiresIn: '4h',
      issuer: 'rss.com',
      subject: 'rss',
    };

    const refreshToken: string = jwt.sign({ userId }, secretKey, tokenContent);

    return refreshToken;
  }

  // 토큰 검증

  // 토큰 복호화
}
