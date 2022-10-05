import { NewsRss } from '~/type/news';
import rssSummaryObj from '~/service/news/news.summary.rss.json';
// import rssFullObj from '~/service/news/news.full.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '~/elasticsearch/elasticsearch';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';

export default class RssService {
  /**
   * 기사 단위의 RSS 샘플
   * @param {*} rssUrl - rss 도메인 주소
   * @return {*} - rss 결과
   * @memberof RssService
   */
  async getSampleRssOne(rssUrl: string) {
    try {
      const rssResult: any = await parse(rssUrl, {});
      return rssResult;
    } catch (e) {
      console.log('e', e);
      throw e;
    }
  }

  /**
   * 신문사 단위의 RSS 샘플
   * @param {*} copyright - 회사명(한글)
   * @return {*} - rss 결과
   * @memberof RssService
   */
  async getSampleRssCopyright(copyright: string, type: string = 'summary') {
    const rssList: any = rssSummaryObj;
    const rssResultArr = [];
    for (const k2 in rssList[copyright]) {
      const rssAddress = rssList[copyright][k2];
      const rssResult = await parse(rssAddress, {});
      console.log('rssAddress', k2, rssAddress);
      const rssResultItem = rssResult.items;
      for (const item of rssResultItem) {
        try {
          // set body
          const data: NewsRss = {
            copyright: copyright,
            category: k2,
            title: item.title,
            link: item.link,
            description_summary: item.description
              ? item.description.substring(0, 100) + '...'
              : null,
            description: type === 'summary' ? null : item.description,
            created: item.created ? dayjs(item.created).toDate() : null,
            published: item.published ? dayjs(item.published).toDate() : null,
            enclosures: item.enclosures ? item.enclosures : null,
            media: item.enclosures ? item.media : null,
          };

          rssResultArr.push(data);
        } catch (e) {
          console.log('e', e);
        }
      }
    }
    return { rssCount: rssResultArr.length, rssArr: rssResultArr };
  }

  /**
   * 기사 단위의 스크래핑 샘플
   * @param {*} scrappingUrl
   * @return {*}
   * @memberof RssService
   */
  async getSampleScrapping(scrappingUrl: string) {
    // await (async () => {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
    //   await page.goto('https://www.google.com');
    //   console.log('page', page);
    //   await browser.close();
    // })();

    console.log('getSampleScrapping in!');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(scrappingUrl);

    const articlebody = await page.$('[itemprop="articleBody"]');
    if (!articlebody) {
      await browser.close();
      return '없음';
    }
    // console.log('articlebody', articlebody);
    const constents = await page.evaluate(
      (tag) => tag.textContent,
      articlebody
    );
    console.log('#constents', constents);

    await browser.close();
    return constents;
  }

  /**
   * 전체 신문사의 rss 데이터를 저장하며, 해당 기사의 url에서 스크래핑하여 기사를 저장
   *
   * @memberof RssService
   */
  async setRss() {
    // summary ver
    await this.setRssData(rssSummaryObj as any, 'summary');
    // full ver
    // await this.setRssData(rssFullObj, 'full');
  }

  /**
   * rss에서 데이터를 받아와 elasticsearch에 저장
   * @param {*} rssList - 전체 신문사 rss 도메인 정보(요약본 기사 버전과 전체 기사 버전으로 분리 호출)
   * @param {string} [type='summary'] - summary: 요약 기사 버전, full: 전체 기사 버전 [description에 데이터를 넣을지 말지를 정의]
   * @memberof RssService
   */
  async setRssData(rssList: any, type: string = 'summary') {
    const elasticsearch = new Elasticsearch();
    for (const k1 in rssList) {
      console.log(k1 + ' start !');
      for (const k2 in rssList[k1]) {
        try {
          const rssAddress = rssList[k1][k2];
          console.log('rssAddress', k2, rssAddress);
          const rssResult = await parse(rssAddress, {});
          const rssResultItem = rssResult.items;

          for (const item of rssResultItem) {
            // set body
            const data: NewsRss = {
              copyright: k1,
              category: k2,
              title: item.title,
              link: item.link,
              description_summary: item.description
                ? item.description.substring(0, 100) + '...'
                : null,
              description: type === 'summary' ? null : item.description,
              created: item.created ? dayjs(item.created).toDate() : null,
              published: item.published ? dayjs(item.published).toDate() : null,
              enclosures: item.enclosures ? item.enclosures : null,
              media: item.enclosures ? item.media : null,
            };

            // insert data
            await elasticsearch.createIndex({
              index: 'news',
              id: data.link,
              body: data,
            });
          }
        } catch (e) {
          console.log('e', e);
          continue;
        }
      }
      console.log(k1 + ' end !');
    }
    console.log(type + ' end!');
  }

  async setDescription() {}
}
