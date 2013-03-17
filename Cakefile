fs     = require 'fs'
{exec} = require 'child_process'

appFiles  = [

]

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'app.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile app.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        fs.unlink 'app.coffee', (err) ->
          throw err if err
          console.log 'Done.'

task 'build-doc', 'Build the documentation', ->
  exec 'docco src/*', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr