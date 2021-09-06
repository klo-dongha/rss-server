import express from 'express'
import bodyParser from'body-parser'
import morgan from'morgan'
import api from './controller'

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()
const port = 3000;

// parse JSON an url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// root
app.get('/', (req, res) => {
  res.send('Hello JWT')
})

// api
app.use('/api', api)

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
});

