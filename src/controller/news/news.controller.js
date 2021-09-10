import rss from 'rss';
import RssService from '@/service/news/rss.service';

import express from 'express';
const router = express.Router();

router.get('/rss', (req, res, next) => {
  const rssService = new RssService();
  console.log('rss in');
  res.status(200).json('hi');
});

module.exports = router;
