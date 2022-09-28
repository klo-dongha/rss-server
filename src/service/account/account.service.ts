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
    console.log('LoginService in');
    console.log('userId', userId);
    console.log('userPassword', userPassword);

    const isValid = await this.checkUser(userId, userPassword);
    if() {

    }

    return;
  }

  async checkUser(userId: string, userPassword: string) {
    // 아이디 비교
    const isMatchId = await this.compareId(userId);
    if() {
      
    }

    // 패스워드 비교
    const isMatchPassword = await this.comparePassword(
      userPassword,
      '$2b$10$uhg.L.EFUZLPFJrZSc9dDu2BcMnWHWskVyrPsOxJCxutbVHmA9exa'
    );
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
  async comparePassword(userPassword: string, hashPassword: string) {
    // password 123
    const match = await bcrypt.compare(userPassword, hashPassword);
    return match;
  }
}
