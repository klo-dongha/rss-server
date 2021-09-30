import rssSummaryObj from './news.summary.rss.json';
import rssFullObj from './news.full.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '@/elasticsearch/elasticsearch';
import moment from 'moment';

export default class RssService {
  async getRssResult() {
    const rssResult = await parse(
      'https://rss.nocutnews.co.kr/category/society.xml'
    );
    console.log('rssResult', rssResult.items[0]);
    return rssResult;
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
          data.description = type === 'type' ? null : item.description;
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
}
