http = require 'http'
path = require 'path'
fs   = require 'fs'

sysout = console.log

CONTENT_TYPES =
  html : 'text/html'
  js   : 'text/javascript'
  css  : 'text/css'
  png  : 'image/png'
  json : 'application/json'

http.createServer((request, response)->

  sysout 'request starting...'

  filePath    = '.' + request.url;
  if filePath == './' then filePath = './index.html'

  extname     = path.extname filePath
  contentType = CONTENT_TYPES[extname.substring(1)]

  fs.exists filePath, (exists)->
    if exists
      fs.readFile filePath, (error, content)->
        if error
          response.writeHead 500
          response.end()
        else
          response.writeHead 200, { 'Content-Type': contentType }
          response.end content, 'utf-8'
    else
      response.writeHead 404
      response.end()

).listen 1337

sysout 'Server running at http://127.0.0.1:1337/'
