import rssSummaryObj from './news.summary.rss.json';
import rssFullObj from './news.full.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '@/elasticsearch/elasticsearch';
import moment from 'moment';
import puppeteer from 'puppeteer';

export default class RssService {
  async getSampleRssOne() {
    const rssResult = await parse(
      'https://www.fnnews.com/rss/r20/fn_realnews_politics.xml'
    );
    console.log('rssResult', rssResult.items[0]);
    return rssResult;
  }

  async getSampleScrapping() {
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
    await page.goto(
      'https://news.jtbc.joins.com/article/article.aspx?news_id=NB12026856'
    );

    const articlebody = await page.$('#articlebody > div:nth-child(1)');
    if (!articlebody) {
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

  async setRss() {
    // summary ver
    await this.insertRssData(rssSummaryObj, 'summary');
    // full ver
    await this.insertRssData(rssFullObj, 'full');
  }

  /** elasticsearch insert */
  async insertRssData(rssList, type = 'summary') {
    const elasticsearch = new Elasticsearch();
    for (const k1 in rssList) {
      for (const k2 in rssList[k1]) {
        const rssAddress = rssList[k1][k2];
        const rssResult = await parse(rssAddress);
        const rssResultItem = rssResult.items;
        for (const item of rssResultItem) {
          // set body
          const data = {};
          data.copyright = k1;
          data.category = k2;
          data.title = item.title;
          data.link = item.link;
          data.description_summary = item.description
            ? item.description.substring(0, 100) + '...'
            : null;
          data.description = type === 'summary' ? null : item.description;
          data.created = item.created
            ? moment(item.created).format('YYYY-MM-DD HH:mm:ss')
            : null;
          data.published = item.published
            ? moment(item.published).format('YYYY-MM-DD HH:mm:ss')
            : null;
          data.enclosures = item.enclosures ? item.enclosures : null;
          data.media = item.enclosures ? item.media : null;

          // insert data
          await elasticsearch.index({
            index: 'news',
            id: data.link,
            body: data,
          });
        }
      }
    }
    console.log(type + ' end!');
  }

  async getScrapping() {}
}
