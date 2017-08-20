'use strict'

var Nightmare = require("nightmare");
var async = require("async");

var config = require('./config/config.json')
//Creates the authenticated nightmare instance
const fb_user = config.facebook.username;
const fb_pw = config.facebook.password;


var scraper = new Nightmare({show: true}).viewport(800,600);
scraper
  .goto('https://www.facebook.com/')
  .type('#email', '')
  .type('#email', fb_user)
  .type('#pass', fb_pw)
  .click('input[type="submit"][value="Anmelden"]')
  .run(function(err, nightmare) {
    if (err) {
      console.log(err);
    }
    console.log('Done.');
  })
  // .evaluate( () => {
  //   var body = document.querySelector('body');
  //   return body;
  // })
  .wait(5000)
  .end()
  .then(
    result => console.log(result)
  );
  // ;


//Trying to use async module to iterate through urls

function load(url, callback){
  scraper
  .goto(url)
  .wait(2000)
  .screenshot('pic'+url+'.png')
  .run(function(err, nightmare) {
    if (err) {
      console.log(err);
    }
    console.log('Done with ', url);
    callback()
  });
}

var urls = [
  'https://facebook.com/JuicyGay/',
  'https://facebook.com/HaiytiakaRobbery/',
]

async.eachSeries(urls, load, function (err) {
  console.log('done!');
});
