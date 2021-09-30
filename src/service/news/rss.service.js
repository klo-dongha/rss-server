import rssSummaryObj from './news.summary.rss.json';
import rssFullObj from './news.full.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '@/elasticsearch/elasticsearch';
import moment from 'moment';

export default class RssService {
  async setSummaryRss() {
    await this.insertRssData(rssSummaryObj, 'summary');
  }

  async setFullRss() {
    await this.insertRssData(rssFullObj, 'full');
  }

  async getRssResult() {
    const rssResult = await parse(
      'http://www.yonhapnewstv.co.kr/category/news/politics/feed/'
    );
    return rssResult;
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
          data.description = type === 'type' ? null : item.description;
          data.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
          data.published = moment(item.published).format('YYYY-MM-DD HH:mm:ss');

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
}
