var fs = require('fs');

function listen(what){
  var _args = Array.prototype.slice.call(arguments);
  console.log(what, _args.slice(1));
}

function formatListen(what){
  return listen(what);
}

fs.watch('test.txt', {}, listen);

var rs = fs.createReadStream('test.txt',{
  'bufferSize': 4 * 1024
});

rs.on('readable', formatListen('readable'));
rs.on('end', formatListen('end'));
rs.on('data', formatListen('data'));
rs.on('close', formatListen('close'));
