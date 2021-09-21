import rssObj from './news.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '@/elasticsearch/elasticsearch';
import moment from 'moment';

export default class RssService {
  async getRss() {
    const elasticsearch = new Elasticsearch();
    const rssList = rssObj;
    for (const k1 in rssList) {
      for (const k2 in rssList[k1]) {
        const rssAddress = rssList[k1][k2];
        const rssResult = await parse(rssAddress);
        const rssResultItem = rssResult.items;
        for (const item of rssResultItem) {
          // set body
          item.copyright = k1;
          item.category = k2;
          item.description_summary = item.description;
          item.description = item.description;
          item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
          item.published = moment(item.published).format('YYYY-MM-DD HH:mm:ss');
          delete item.enclosures;
          delete item.media;
          delete item.created;
          delete item.author;

          // insert data
          const count = await elasticsearch.index({
            index: 'news',
            id: item.link,
            body: item,
          });
        }
      }
    }

    const rssResult = await parse(
      'https://fs.jtbc.joins.com/RSS/politicaldesk.xml'
    );

    // console.log('rss', Array.isArray(rss), typeof rss);
    // console.log(
    //   rss.items[0].published,
    //   moment(rss.items[0].published).format('YYYY-MM-DD HH:mm:ss')
    // );
    // console.log('count:', count);

    return rssResult;
  }
}
