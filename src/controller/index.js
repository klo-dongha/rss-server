import express from 'express';
const router = express.Router();

import NewsController from './news/news.controller';

router.use('/news', NewsController);

module.exports = router;
