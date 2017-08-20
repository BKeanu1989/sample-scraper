'use strict'

var Nightmare = require("nightmare");

var nightmare = Nightmare({
  show: true
}).viewport(1200,800);
var async = require("async");

var config = require('./config/config.json')
//Creates the authenticated nightmare instance
const fb_email = config.facebook.email;
const fb_pw = config.facebook.password;

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

var urls = [
  'https://facebook.com/JuicyGay/',
  'https://facebook.com/HaiytiakaRobbery/',
]

function login(nightmare) {
  return new Promise(function(resolve,reject) {
    nightmare.title();
      resolve(toReturn);
  });
}

var login = function(selector) {
  return function(nightmare) {
    return nightmare
      if (nightmare.exists(selector)) {
        nightmare.evaluate(function() {
          console.log("are you here?");
        }, selector)
      }
      // .title()
      // .wait()
  }
}

var login2 = function(email, password){
  return function(nightmare) {
    nightmare
      .viewport(800, 1600)
      .goto('http://99designs.com/login')
        .type('#username', email)
        .type('#password', password)
        .click('.button--primary')
      .wait();
  };
};

var test = function(){
  return function(nightmare) {
    return nightmare
      .title()
      .wait(10000);
  };
};

var selector = 'meta[name="description"]';

// nightmare
//   .goto('https://www.facebook.com/')
//   .then( _ => {
//     return nightmare
//       .wait(200)
//       .evalute(function() {
//         return document.querySelector('meta[name="description"]')
//       });
//   })
//   .then(result => {
//     console.log('test');
//     console.log(result);
//   })
//   .then((x) => {
//     nightmare.end();
//   })
var results = [];
nightmare
  .goto('https://www.facebook.com/')
  // .then(gotoStatus => {
  //   if (gotoStatus.code !== 200) {
  //     return Promise.reject("HTTP error");
  //   }
  //   // OK response
  //   return nightmare
  //     .wait(250)
  //     .evaluate(function() {
  //       // some eval code that returns results
  //     });
  // })
  .then(nightmare.exists('#email'))
  .then(result => {
    if (result) {
        nightmare.type('#email', '')
        .type('#email', fb_email)
        .type('#pass', fb_pw)
        .click('input[type="submit"][value="Anmelden"]')
        .wait(3000)
    }
  })
  .then(() => {
    console.log('custom loop');
    console.log(selector);
        urls.reduce(function(accumulator, url) {
          return accumulator.then(function(results) {
            return nightmare.goto(url)
              .wait('body')
              .evaluate(function(selector) {
                return document.querySelector(selector).content;
              }, selector)
              .then(function(result){
                console.log('custom result', result);
                results.push(result);
                return results;
              });
          });
        }, Promise.resolve([])).then(function(results){
            console.dir(results);
            return nightmare.end()
        });
      })
  // .then(result => console.log('Result:', result))
  // .catch(error => console.log('An error occurred:', error))
  // .then(_ => nightmare.end());

  // nightmare
  //   .goto('https://www.facebook.com/')
  //   .type('#email', '')
  //   .type('#email', fb_email)
  //   .type('#pass', fb_pw)
  //   .click('input[type="submit"][value="Anmelden"]')
  //   .wait(3000)
  //   .then(() => {
  //     urls.reduce(function(accumulator, url) {
  //       return accumulator.then(function(results) {
  //         return nightmare.goto(url)
  //           .wait('body')
  //           .evaluate(function(selector) {
  //             return document.querySelector(selector).content;
  //           }, selector)
  //           .then(function(result){
  //             results.push(result);
  //             return results;
  //           });
  //       });
  //     }, Promise.resolve([])).then(function(results){
  //         console.dir(results);
  //         return nightmare.end()
  //     });
  //   })
