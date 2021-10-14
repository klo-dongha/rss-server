import RssService from '@/service/news/rss.service';

import express from 'express';
const router = express.Router();

router.get('/sample-rss', async (req, res, next) => {
  const rssService = new RssService();
  const result = await rssService.getSampleRssOne();
  res.status(200).json(result);
});

router.get('/sample-scrapping', async (req, res, next) => {
  const rssService = new RssService();
  const result = await rssService.getSampleScrapping();
  res.status(200).json(result);
});

router.post('/rss', async (req, res, next) => {
  const rssService = new RssService();
  await rssService.setRss();
  res.status(200).json();
});

module.exports = router;
