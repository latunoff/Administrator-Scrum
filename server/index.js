import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose' ;
import config from './config' ;
import routesForApp from './routes';

mongoose.connect(config.db, {
  // useMongoClient: true,
  promiseLibrary: global.Promise
},
(err, res)=>{
  if (err){
    console.log('DB connection failed')
  }
  else {
    console.log('DB connection Success: '+config.db)
  }
})

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
routesForApp(app);

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.listen(config.port, () => console.log('Listening on port ' + config.port + ' ...'));
