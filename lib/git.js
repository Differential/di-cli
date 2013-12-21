var BOILERPLATE = 'meteor-boilerplate';
var URL_PREFIX = 'https://github.com/BeDifferential/';
var URL_SUFFIX = '.git';

var Q = require("q")

function gitUrl(appname){
  return URL_PREFIX + appname + URL_SUFFIX;
}

function execute(cmd){
  var exec = require('child_process').exec;
  
  var deferred = Q.defer();
  exec(cmd, function (error, stdout, stderr){
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve()
    }
  });
  return deferred.promise;
}

function clone(appname){
  cmd = ['git clone', gitUrl(BOILERPLATE), appname].join(' ');
  return execute(cmd);
}

function setOrigin(appname){
  cmd = ['git', '--git-dir=' + appname + '/.git', 'remote set-url origin', gitUrl(appname)].join(' ');
  return execute(cmd);
}


exports.create = function(appname){
  clone(appname)
  .then(function(){
    setOrigin(appname)
  })
  .fail(function(error){
    console.log("Doh! Something bad happened...");
    console.log(error.message);
  })
}