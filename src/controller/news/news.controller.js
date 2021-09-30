import RssService from '@/service/news/rss.service';

import express from 'express';
const router = express.Router();

router.post('/rss', async (req, res, next) => {
  const rssService = new RssService();
  await rssService.setFullRss();
  await rssService.setSummaryRss();
  res.status(200).json();
});

router.get('/rss-result', async (req, res, next) => {
  const rssService = new RssService();
  const result = await rssService.getRssResult();
  res.status(200).json(result);
});

module.exports = router;
