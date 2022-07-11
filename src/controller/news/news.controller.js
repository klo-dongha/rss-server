import RssService from '@/service/news/rss.service';
import express from 'express';

const router = express.Router();

router.get('/sample-rss', async (req, res, next) => {
  const rssUrl = req.query.rssUrl;

  console.log('rssUrl::', rssUrl);

  const rssService = new RssService();
  const result = await rssService.getSampleRssOne(rssUrl);
  res.status(200).json(result);
});

router.get('/sample-rss-copyright', async (req, res, next) => {
  const copyright = req.query.copyright;

  console.log('copyright::', copyright);

  if (copyright) {
    const rssService = new RssService();
    const result = await rssService.getSampleRssCopyright(copyright);
    res.status(200).json(result);
  } else {
    res.status(200).json(null);
  }
});

router.get('/sample-scrapping', async (req, res, next) => {
  const scrappingUrl = req.query.scrappingUrl;

  console.log('scrappingUrl::', scrappingUrl);

  const rssService = new RssService();
  const result = await rssService.getSampleScrapping(scrappingUrl);
  res.status(200).json(result);
});

router.post('/rss', async (req, res, next) => {
  const rssService = new RssService();
  await rssService.setRss();
  res.status(200).json();
});

module.exports = router;
