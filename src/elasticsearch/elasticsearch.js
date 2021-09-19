import Elasticsearch from '@elastic/elasticsearch';

export default class ElasticSearch {
  static client = new Elasticsearch.Client({
    // node: {
    //   url: new URL(ElasticSearch.config.node),
    // },
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'elastic',
    },
  });

  async count(options) {
    try {
      const result = await ElasticSearch.client.count(options);
      return result.body.count;
    } catch (e) {
      throw e;
    }
  }
}
