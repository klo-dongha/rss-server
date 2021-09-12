import RssService from '@/service/news/rss.service';

import express from 'express';
const router = express.Router();

router.get('/rss', async (req, res, next) => {
  const rssService = new RssService();
  const result = await rssService.getRss();
  console.log(result);
  res.status(200).json(result);
});

module.exports = router;
