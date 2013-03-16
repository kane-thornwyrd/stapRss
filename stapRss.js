/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  res.end('Hello World.\n');

}).listen(9080, "");
