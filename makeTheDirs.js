var fs = require('fs-extra')
  , gm = require('gm').subClass({ imageMagick: true });

var path = __dirname + '/charactersToSplice/';
var path2 = __dirname + '/charactersToSplice/1_new.png';
var items = [] // files, directories, symlinks, etc 
fs.walk(path)
  .on('data', function (item) {
      items.push(item.path)
      var strFileName = item.path;
      strFileName = strFileName.substring(38,strFileName.length);
      strFileName = strFileName.replace('.png', '');
      var newDirPath = path + strFileName// + '\\';
      fs.mkdirsSync(newDirPath)
      
  })
  .on('end', function () {
      //console.dir(items) // => [ ... array of files] 
  })




function spliceMeTo32x48(x, y,originalFile,newFile) {
    gm(originalFile)
  .crop(32, 48, x, y)
  .write(newFile, function (err) {
      if (err) return console.dir(arguments)
      //console.log(this.outname + " created  ::  " + arguments[3])
  }
);

};

function makeTheDirs() {
    fs.walk(path)
  .on('data', function (item) {
      items.push(item.path)
      var strFileName = item.path;
      strFileName = strFileName.substring(38, strFileName.length);
      strFileName = strFileName.replace('.png', '');
      var newDirPath = path + strFileName// + '\\';
      fs.mkdirsSync(newDirPath)

  })
  .on('end', function () {
      //console.dir(items) // => [ ... array of files] 
  })

};