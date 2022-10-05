import CustomError from '~/utils/customError';
import AuthService from '~/utils/auth.service';
import bcrypt from 'bcrypt';
export default class LoginService {
  /**
   * 로그인 로직
   * @param {string} userId
   * @param {string} userPassword
   * @return {*}
   * @memberof LoginService
   */
  async login(userId: string, userPassword: string) {
    // 1. 유저 존재 여부 체크
    const exists: boolean = await this.findUser(userId, userPassword);
    if (!exists) {
      throw new CustomError('해당 계정이 존재하지 않습니다.');
    }

    // 2. 패스워드 체크
    const isMatchPassword: boolean = await this.comparePassword(
      userPassword,
      '$2b$10$uhg.L.EFUZLPFJrZSc9dDu2BcMnWHWskVyrPsOxJCxutbVHmA9exa'
    );
    if (!isMatchPassword) {
      throw new CustomError('패스워드가 일치하지 않습니다.');
    }

    // 3. 토큰 발행
    const authService = new AuthService();
    const refreshToken: string = await authService.createRefreshToken(userId);
    const accessToken: string = await authService.createAccessToken(userId);

    return { refreshToken, accessToken };
  }

  /**
   * 아이디 존재 여부 체크
   * @param {string} userId
   * @param {string} userPassword
   * @return {*}  {Promise<boolean>}
   * @memberof LoginService
   */
  async findUser(userId: string, userPassword: string): Promise<boolean> {
    // 아이디 비교
    const isMatchId: boolean = await this.compareId(userId);
    return isMatchId;
  }

  async compareId(userId: string) {
    console.log('userId', userId);
    return true;
  }

  /**
   * 비밀번호 비교
   * @param {string} userPassword
   * @return {*}
   * @memberof LoginService
   */
  async comparePassword(
    userPassword: string,
    hashPassword: string
  ): Promise<boolean> {
    try {
      const match: boolean = await bcrypt.compare(userPassword, hashPassword);
      return match;
    } catch (e) {
      throw e;
    }
  }
}
