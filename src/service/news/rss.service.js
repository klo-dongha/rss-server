import rssList from './news.rss.json';
import { parse } from 'rss-to-json';
import Elasticsearch from '@/elasticsearch/elasticsearch';

export default class RssService {
  async getRss() {
    console.log('rssList', rssList);
    const rss = await parse(
      'https://www.khan.co.kr/rss/rssdata/total_news.xml'
    );

    const elasticsearch = new Elasticsearch();
    const count = await elasticsearch.count({
      index: 'kibana_sample_data_ecommerce',
    });
    console.log('count:', count);

    return rss;
  }
}
