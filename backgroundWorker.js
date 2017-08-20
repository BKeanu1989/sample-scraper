const fs = require('fs');
var exec = require('child_process').exec;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

execute('DEBUG=nightmare babel-node ./test-scraper.js', function(output) {
    console.log(output);
});
