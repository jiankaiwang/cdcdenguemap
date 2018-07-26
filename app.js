/** 
 * Main Entry
 * Creator: JianKai Wang (https://jiankaiwang.no-ip.biz/)
*/

/*
 * Module dependencies.
 */

var sc = require('./configure/sysconfig')
  , express = require('express')
  , routes = require('./routes')
  , wo = require('./controllers/weboperating')
  , http = require('http')
  , https = require('https')
  , session = require('express-session')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app = express()
  , assert = require('assert');

var api = require('./routes/api')
  , api_service = require('./routes/api_service');

/* 
  * desc : session settings, 
  * note : this must before app.use()
  * using:
  * be sure you have doing "req.session.save();"
  * before you redirect the page
  */
if(! sc.sysconf["use-redis"]) {
  var cookieID = wo.getSessionHash();
  app.use(express.cookieParser());
  app.use(session({
    secret: cookieID, 
    cookie: {maxAge: 30 * 60 * 1000},	// existing time period : ms
    resave: true,
    saveUninitialized: true
  }));
} else {
  var redis = require("redis")
  , redisStore = require('connect-redis')(session);

  var client = redis.createClient(
    sc.sysconf['redisServer']['port'], 
    sc.sysconf['redisServer']['host'], 
    {auth_pass: sc.sysconf['redisServer']['password']}
  );

  client.on("error", function (err) {
    console.log("Error " + err);
    assert(err instanceof redis.ReplyError);
  });

  app.use(express.cookieParser());
  app.use(session({
    secret: wo.getSessionHash(),
    store: new redisStore({ 
      host: sc.sysconf["redisServer"]["host"], 
      port: sc.sysconf["redisServer"]["port"], 
      secret: sc.sysconf['redisServer']['password'],
      client: client, 
      ttl : sc.sysconf["redisServer"]["ttl"]
    }),
    saveUninitialized: true,
    resave: true
  }));
}

/*
 * all environments
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

/*
 * development only
 */
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * desc : routing page
 * note :
 * |- / : portal
 * |- /api : necessary public api entry
 */
app.get('/', routes.index);
app.get('/zh_TW', routes.index);
app.get('/en', routes.index);
app.all('/api', api.portal);
app.all('/api/service', api_service.portal);

/*
 * desc : open http / https server 
 * https server use let's encrypt as the example
 */
if (sc.sysconf["allowService"]["http"]) {
  http.createServer(app).listen(sc.sysconf["allowServicePort"]["http"], function(){
    console.log('Service is listening on port ' + sc.sysconf["allowServicePort"]["http"]);
  });
}

if (sc.sysconf["allowService"]["https"]) {
  var options = {
    key: fs.readFileSync(sc.sysconf["https-cert-path"]["key"]),
    cert: fs.readFileSync(sc.sysconf["https-cert-path"]["cert"]),
    ca: fs.readFileSync(sc.sysconf["https-cert-path"]["ca"])
  };
  https.createServer(options, app).listen(sc.sysconf["allowServicePort"]["https"], function(){
    console.log('Service is listening on port ' + sc.sysconf["allowServicePort"]["https"]);
  });
}
