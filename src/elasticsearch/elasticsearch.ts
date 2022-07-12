import Elasticsearch from '@elastic/elasticsearch';
import elasticParams from '@elastic/elasticsearch/api/requestParams';

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
    ssl: {
      rejectUnauthorized: false,
    },
    requestTimeout: 8000,
  });

  /**
   * 검색
   * @param indexName - 인덱스명
   * @param body - Query DSL
   * @param {object} [opts] - 기타 옵션
   * @returns 검색 결과
   */
  async search(indexName: string, body: { [key: string]: any }, opts?: any) {
    // 환경별 index name 세팅
    const param: any = { index: indexName, body, ...opts };
    const response = await ElasticSearch.client.search(param);
    return response;
  }

  async multiSearch(body: Array<{ [key: string]: any }>) {
    const response = await ElasticSearch.client.msearch({
      body,
    });
    return response;
  }

  // Index 관련
  async isExistIndex(indexName: string) {
    const response = await ElasticSearch.client.indices.exists({
      index: indexName,
    });
    return response.body;
  }

  /**
   * 인덱스 생성
   * @param options object(필수: index(인덱스명), body)
   * @description 인덱스명은 반드시 -prod, -test, -dev 등의 suffix 없이 입력할 것
   * @returns true
   */
  async createIndex(options: elasticParams.Index) {
    try {
      options.index = options.index;
      await ElasticSearch.client.index(options);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async getIndex(filter = '*') {
    return (await ElasticSearch.client.indices.get({ index: filter })).body;
  }

  async deleteIndex(indexName: string) {
    await ElasticSearch.client.indices.delete({
      index: indexName,
    });
  }

  async getAliases() {
    return (await ElasticSearch.client.indices.getAlias()).body;
  }

  async addAlias(index: string, alias: string) {
    await ElasticSearch.client.indices.putAlias({ index: index, name: alias });
  }

  async refreshIndex(index: string) {
    await ElasticSearch.client.indices.refresh({ index: index });
  }

  // Document 관련
  /**
   * 중복 생성 또는 생성 실패시 false 반환
   * @param options object(필수: id, index, type, body)
   */
  async create(options: elasticParams.Create) {
    try {
      options.index = options.index;
      await ElasticSearch.client.create(options);
      return true;
    } catch {
      return false;
    }
  }

  async update(options: elasticParams.Update) {
    options.index = options.index;
    await ElasticSearch.client.update(options);
  }

  /**
   * 없는 doc 삭제 또는 삭제 실패시 false 반환
   * @param options object(필수: id, index, type)
   */
  async delete(options: elasticParams.Delete) {
    try {
      options.index = options.index;
      await ElasticSearch.client.delete(options);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 쿼리 이용 doc 삭제
   * @param options object(필수: index, type, body)
   * @returns 삭제된 doc 수
   */
  async deleteByQuery(options: elasticParams.DeleteByQuery) {
    try {
      const result = await ElasticSearch.client.deleteByQuery(options);
      return result.body.deleted;
    } catch (e) {
      throw e;
    }
  }

  /**
   * doc 존재 유무 확인
   * @param options object(필수: id, index, type)
   * @returns true or false
   */
  async exists(options: elasticParams.Exists) {
    try {
      const result = await ElasticSearch.client.exists(options);
      return result.body;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @param options object(필수: id, index, type)
   * @returns ({'필드값': '내용'})
   */
  async get(options: elasticParams.Get) {
    try {
      options.index = options.index;
      const result = await ElasticSearch.client.get(options);
      return result.body._source;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 쿼리에 해당하는 doc 수
   * @param options object(옵션: id, index, type, ...)
   * @returns number
   */
  async count(options: elasticParams.Count) {
    try {
      const result = await ElasticSearch.client.count(options);
      return result.body.count;
    } catch (e) {
      throw e;
    }
  }
}
