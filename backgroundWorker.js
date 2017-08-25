const fs = require('fs');
const util = require('util');
// const exec = util.promisify(require('child_process').exec); // does not work with electron
const exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, function(error, stdout, stderr) {
    callback(stdout);
  });
};

// ipc.on('crawl-fb', function(event, fromWindowId) {
//   execute('DEBUG=nightmare babel-node ./test-scraper.js', function(output) {
//       console.log(output);
//
//   });
//   const fromWindow = BrowserWindow.fromid(fromWindowId);
//   fromWindow.webContents.send('fb-crawled');
//   window.close();
// });

ipc.on('crawl-fb', function(event, number, fromWindowId) {
  execute('DEBUG=nightmare babel-node ./test-scraper.js', function(output) {
    // console.log(output);
    console.log('fromWindowId:', fromWindowId);
    const fromWindow = BrowserWindow.fromId(fromWindowId);
    console.log(fromWindow);
    console.log(fromWindow.webContents);
    console.log(window);
    fromWindow.webContents.send('fb-crawled');
    window.close();
  });
  // const result = factorial(number)
  // const fromWindow = BrowserWindow.fromId(fromWindowId)
  // fromWindow.webContents.send('factorial-computed', number, result)
  // window.close()
})

function factorial(num) {
  if (num === 0) 
    return 1
  return num * factorial(num - 1)
}

// async function executeScraper() {
//   const {stdout, stderr} = await exec('node ./test-scraper.js');
//   // const {stdout, stderr} = await exec('DEBUG=nightmare babel-node ./test-scraper.js');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// }

// executeScraper();