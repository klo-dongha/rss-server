import rssList from './news.rss.json';
import { parse } from 'rss-to-json';

export default class RssService {
  async getRss() {
    const rss = await parse('http://rss.kmib.co.kr/data/kmibRssAll.xml');
    return rss;
  }
}
