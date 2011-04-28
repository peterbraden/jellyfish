var assert = require('assert')
  , jellyfish = require('jellyfish');

var done = [];

var test = function(b) {
  b.go("http://www.wikipedia.com")
    .js("document.title", function(o) {
      console.log(b.name + ": " + JSON.stringify(o));
      assert.equal(o.result,"Wikipedia")
    })
    .js("document.getElementById(\'searchInput\').value = \'test\'", function(o) {
      console.log(b.name + ": " + JSON.stringify(o));
    })
    .js("document.getElementById(\'searchInput\').value", function(o) {
      console.log(b.name + ": " + JSON.stringify(o));
    })
    .js("document.getElementsByName(\'go\')[0].click()", function(o) {
      console.log(b.name + ": click");
    })
    .jsfile("./test.js", function(o) {
      console.log(b.name + ": " + JSON.stringify(o));
      b.stop(function() {
        console.log("Done: " + b.name);
      });
    })
};

var browsers = [];
browsers.push(jellyfish.createFirefox());
browsers.push(jellyfish.createChrome());
browsers.push(jellyfish.createSafari());
browsers.push(jellyfish.createSauce());
//browsers.push(jellyfish.createZombie());

browsers.forEach(function(o) {
  test(o);
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack)
});