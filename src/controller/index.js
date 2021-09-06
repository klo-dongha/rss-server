import express from 'express'
const router = express.Router()

import NewsController from './news'

router.get('/news', NewsController.register)

module.exports = router