var fs = require('fs-extra')
  , gm = require('gm').subClass({ imageMagick: true });

/*var path = __dirname + '\\charactersToSplice\\';
var path2 = __dirname + '/charactersToSplice/1_new.png';
var items = [] // files, directories, symlinks, etc 
fs.walk(path)
  .on('data', function (item) {
      if (item.path.indexOf('.png') != -1) {
          items.push(item)
      };

  })
  .on('end', function () {
      //console.dir(items) // => [ ... array of files] 
      for (var j = 0; j < items.length; j++) {
          var item = items[j];
          var strFileName = item.path;
          strFileName = strFileName.substring(38, strFileName.length);
          strFileName = strFileName.replace('.png', '');
          var newDirPath = path + strFileName// + '\\';
          //fs.mkdirsSync(newDirPath)
          var numFuturex = 0;
          var numFuturey = 0;
          var loopCounter = 0;
          var rowCounter = 0;
          for (var i = 0; i < 16; i++) {
              if (loopCounter == 4) {
                  loopCounter = 0
                  rowCounter++;
              };
              var numFuturex = loopCounter * 32;
              var numFuturey = rowCounter * 48;
              var strFuturePath = item.path;
              var strFutureFileName = item.path.substring(38, item.path.length);
              strFutureFileName = strFutureFileName.replace('.png', '');
              strFutureFileName = newDirPath + '\\' + i + '.png';
              //strFutureFileName = strFutureFileName.substring(0, strFutureFileName.length - 1);
              //spliceMeTo32x48(i * 32, (i % 4) * 48, item.path, strFileName + i + '.png')
              spliceMeTo32x48(numFuturex, numFuturey, strFuturePath, strFutureFileName);
              console.log("Created " + strFutureFileName + " from " + strFuturePath + " from an x of " + numFuturex + " and a y of " + numFuturey);
              loopCounter++;
          };
      }



  })
  */



function spliceMeTo32x48(x, y, originalFile, newFile) {
    gm(originalFile)
  .crop(32, 48, x, y)
  .write(newFile, function (err) {
      if (err) return console.dir(arguments)
      //console.log(this.outname + " created  ::  " + arguments[3])
  }
);

};

function makeTheDirs(pathToWalk) {
    var items = [];
    fs.walk(pathToWalk)
  .on('data', function (item) {
      items.push(item.path)
      var strFileName = item.path;
      strFileName = strFileName.substring(38, strFileName.length);
      strFileName = strFileName.replace('.png', '');
      var newDirPath = pathToWalk + strFileName// + '\\';
      newDirPath = newDirPath.replace(/\\/g, "\\\\");
      fs.mkdirsSync(newDirPath)

  })
  .on('end', function () {
      console.dir(items) // => [ ... array of files] 
  })

};

function spliceTheImages(pathToWalk, width, height, imagesPerRow, numberOfRows,optionalFilePrefix) {
    var numNumberOfLoopsToRun = imagesPerRow * numberOfRows;
    var items = [] // files, directories, symlinks, etc 
    fs.walk(pathToWalk)
      .on('data', function (item) {
          if (item.path.indexOf('.png') != -1) {
              items.push(item)
          };

      })
      .on('end', function () {
          //console.dir(items) // => [ ... array of files] 
          for (var j = 0; j < items.length; j++) {
              var item = items[j];
              var strFileName = item.path;
              strFileName = strFileName.substring(38, strFileName.length);
              strFileName = strFileName.replace('.png', '');
              var newDirPath = pathToWalk + strFileName// + '\\';
              newDirPath = newDirPath.replace(/\\/g, "\\\\");
              //fs.mkdirsSync(newDirPath)
              var numFuturex = 0;
              var numFuturey = 0;
              var loopCounter = 0;
              var rowCounter = 0;
              for (var i = 0; i < numNumberOfLoopsToRun; i++) {
                  if (loopCounter == imagesPerRow) {
                      loopCounter = 0
                      rowCounter++;
                  };
                  var numFuturex = loopCounter * width;
                  var numFuturey = rowCounter * height;
                  var strFuturePath = item.path;
                  var strFutureFileName = item.path.substring(38, item.path.length);
                  strFutureFileName = strFutureFileName.replace('.png', '');
                  strFutureFileName = newDirPath + '\\' + optionalFilePrefix + i + '.png';
                  //strFutureFileName = strFutureFileName.substring(0, strFutureFileName.length - 1);
                  //spliceMeTo32x48(i * 32, (i % 4) * 48, item.path, strFileName + i + '.png')
                  spliceMeTo32x48(numFuturex, numFuturey, strFuturePath, strFutureFileName);
                  console.log("Created " + strFutureFileName + " from " + strFuturePath + " from an x of " + numFuturex + " and a y of " + numFuturey);
                  loopCounter++;
              };
          }



      })
};