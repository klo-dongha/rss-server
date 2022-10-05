import defaultConfig from './default.json';
import deepmerge from 'deepmerge';
import mkdirp from 'mkdirp';

class ConfigManager {
  // 깊은 복사로 기본 설정에 NODE_ENV 덮어씌우기
  public static config = deepmerge(
    defaultConfig,
    require(`./${process.env.NODE_ENV?.replace('-', '.')}.json`)
  );

  // public static createDirectory() {
  //   Object.keys(this.config.path).forEach(
  //     (key: keyof typeof this.config.path) => {
  //       const path = this.config.path[key];

  //       if (!path.startsWith('volume/')) return;

  //       mkdirp.sync(path);
  //     }
  //   );
  // }

  public static setConfig(keys: any) {
    ConfigManager.config = deepmerge(ConfigManager.config, {
      crypto: { key: keys.serverEncryptKey },
      jwt: {
        key: keys.catchJwtKey,
      },
      catchJwt: {
        key: keys.catchJwtKey,
      },
      db: {
        catchJob: { password: keys.dbCatchPassword },
        catchJobLog: { password: keys.dbCatchPassword },
        kakao: {
          password: keys.dbSmsPassword,
        },
      },
    });
  }
}

export default ConfigManager;
