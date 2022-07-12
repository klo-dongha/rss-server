import ExpressApp from '~/express.app';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

// Unhandled error 발생시 종료 방지 및 로깅
process.on('uncaughtException', (error) => {
  console.log(error);
});

// process.umask(0o000);
// async () => {
//   /* =======================
//     DAY JS CONFIGURATION
// ==========================*/
//   dayjs.extend(utc);
//   dayjs.extend(tz);
//   dayjs.tz.setDefault('Asia/Seoul');
//   dayjs.locale('ko');
//   await new ExpressApp().run();

//   // process.on('SIGTERM', () => {
//   //   server.close(() => process.exit(0));
//   // });
// };

process.umask(0o000);
(async () => {
  const server = await new ExpressApp().run();
})().catch((error) => {
  throw error;
});
