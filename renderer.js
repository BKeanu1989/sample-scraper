// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const Nightmare = require('nightmare');


fs.appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});


var exec = require('child_process').exec;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

// call the function
// execute('DEBUG=nightmare babel-node ./crawl-wsi.js', function(output) {
//     console.log(output);
// });

// call the function
execute('DEBUG=nightmare babel-node ./test-fb.js', function(output) {
    console.log(output);
});