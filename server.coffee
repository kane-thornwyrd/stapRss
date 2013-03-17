express   = require 'express'
http      = require 'http'
path      = require 'path'
enchilada = require 'enchilada'
coffeeify = require 'coffeeify'
brfs      = require 'brfs'
os        = require 'os'
compiler  = require 'connect-compiler'
routes    = require './routes'

app     = express()

app.configure ->
  app.use express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 })
  app.set 'port', process.env.PORT || 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser '$1$bC3pNkt5$XneNi13bll6nI2mmXnQNq1'
  app.use express.session()
  app.use app.router
  app.use (err, req, res, next)->
    console.error err.stack
    next err
  app.use (err, req, res, next)->
    if req.xhr
      res.send(500,
        error: 'Sorry, something blew up!'
      )
    else
      next err


  tmpDir = os.tmpDir()
  app.use require('less-middleware')
    src: __dirname + '/public/stylesheets'
    dest: tmpDir
    prefix: '/stylesheets'
    compress: true
    optimization: 2

  app.use enchilada
    src           : __dirname + '/public'
    cache         : true
    compress      : true
    debug         : true
    routes        :
      '/javascripts/modernizr.min.js' : './javascripts/modernizr.min.js'
      '/js/backbone.js'         : 'backbone'
    transforms    : [ coffeeify, brfs ]

  app.use compiler
    enabled : [ 'coffee' ],
    src     : path.join(__dirname, 'public','coffeescript')
    dest    : path.join(__dirname, 'public','javascripts')
    options :
      'coffee' :
        'bare' : false

  app.use express.static(path.join(__dirname, 'public'))
  app.use express.static(tmpDir)


app.configure 'development', ->
  app.use express.errorHandler()

app.get '/', routes.index

http.createServer(app).listen app.get('port'), ->
  console.log "Express server on http://localhost:" + app.get('port')