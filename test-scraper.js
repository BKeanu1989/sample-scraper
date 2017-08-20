'use strict'

var Nightmare = require("nightmare");

var nightmare = Nightmare({
  show: true
});
var async = require("async");

//Creates the authenticated nightmare instance

// var scraper = new Nightmare()
//   .goto('https://www.example.com/signin')
//   .type('#login', 'username')
//   .type('#password', 'password')
//   .click('#btn')
//   .run(function(err, nightmare) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('Done.');
//   });
//
// //Trying to use async module to iterate through urls
//
// function load(url, callback){
//   scraper
//   .goto(url)
//   .wait(2000)
//   .screenshot('pic'+url[25]+'.png')
//   .run(function(err, nightmare) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('Done with ', url[25]);
//     callback()
//   });
// }
//
// var urls = [
//   'https://www.example.com/p1',
//   'https://www.example.com/p2',
//   'https://www.example.com/p3',
// ]
//
// async.eachSeries(urls, load, function (err) {
//   console.log('done!');
// });

var urls = ['https://complete-webolutions.de', 'https://wostudiereich.de', 'https://mokka-merch.com'];
urls.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto(url)
      .wait('body')
      .title()
      .then(function(result){
        results.push(result);
        return results;
      });
  });
}, Promise.resolve([])).then(function(results){
    console.dir(results);
    return nightmare.end()
});
