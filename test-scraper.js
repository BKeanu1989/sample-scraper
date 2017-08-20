'use strict'

const fs = require('fs');

var Nightmare = require("nightmare");
var moment = require('moment');

// var nightmare = Nightmare({show: true}).viewport(1200,800);
var nightmare = Nightmare({show: false});
var async = require("async");

var config = require('./config/config.json')
//Creates the authenticated nightmare instance
const fb_email = config.facebook.email;
const fb_pw = config.facebook.password;



var urls = [
  'https://facebook.com/JuicyGay/',
  'https://facebook.com/HaiytiakaRobbery/',
]

var selector = 'meta[name="description"]';

var results = [];
var objectResults = {};

nightmare
  .goto('https://www.facebook.com/')
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
        urls.reduce(function(accumulator, url) {
          return accumulator.then(function(results) {
            return nightmare.goto(url)
              .wait('body')
              .evaluate(function(selector) {
                return document.querySelector(selector).content;
              }, selector)
              .then(function(result){
                var objectResult = {};
                console.log('custom result', result);
                var resultsForObject = result.match(/(\d+\.)?\d+/g);
                console.log(resultsForObject);
                var likes = parseInt(resultsForObject[0].replace('.', ''));
                var ta = parseInt(resultsForObject[1].replace('.', ''));
                var tar = ta / likes * 100;
                objectResult.url = url;
                objectResult.likes = likes;
                objectResult.tar = tar;
                results.push(objectResult);
                return results;
              });
          });
        }, Promise.resolve([])).then(function(results){
            var date = moment().format("YYYY-MM-D");
            var crawledResults = JSON.stringify(results);
            fs.writeFile(`./data/${date}.json`, crawledResults, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            return nightmare.end()
        });
      })
