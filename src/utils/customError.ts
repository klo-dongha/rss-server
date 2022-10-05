/*
  errorCode
  0~999: 사용자에게 Alert를 자동으로 보여줌 (Axios 미들웨어로 동작)
  1000~: 사용자에게 Alert를 자동으로 보여주지 않음
*/

interface CustomErrorValue {
  errorMessage: string;
  errorCode: string;
  detail: string;
}

class CustomError {
  errorMessage: string;
  errorCode: string;
  detail: any;

  constructor(
    errorMessage?: string,
    errorCode?: string | number,
    detail?: string | Object
  ) {
    this.errorMessage = errorMessage
      ? errorMessage
      : '해당 기능을 사용할 수 없습니다.';
    this.errorCode = errorCode ? errorCode.toString() : '0';
    this.detail = detail ? detail : null;
  }

  valueOf() {
    return {
      errorMessage: this.errorMessage,
      errorCode: this.errorCode,
      detail: this.detail,
    } as CustomErrorValue;
  }

  toString() {
    return JSON.stringify({
      errorMessage: this.errorMessage,
      errorCode: this.errorCode,
      detail: this.detail,
    });
  }
}

export default CustomError;
