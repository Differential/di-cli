var ORG = 'BeDifferential';
var BOILERPLATE = 'meteor-boilerplate';
var HTTPS_URL_PREFIX = 'https://github.com/BeDifferential/';
var SSH_URL_PREFIX = 'git@github.com:BeDifferential/';
var URL_SUFFIX = '.git';

var Q = require("q");
var GitHubApi = require("github");
var github = new GitHubApi({
    version: "3.0.0",
    timeout: 5000
});

var _appname;
var _prefix;
var _username;
var _password;

function gitUrl(prefix, appname){
  return prefix + appname + URL_SUFFIX;
}

function execute(cmd){
  var exec = require('child_process').exec;
  
  var deferred = Q.defer();
  exec(cmd, function (error, stdout, stderr){
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(stdout)
    }
  });
  return deferred.promise;
}

function init(appname, protocol){
  _appname = appname;

  var deferred = Q.defer();
  if (!protocol){
    cmd = '[ -f ~/.ssh/id_rsa.pub ] && echo "true" || echo "false"'
    execute(cmd).then(function(result){
      if (result.indexOf('true') != -1){
        _prefix = SSH_URL_PREFIX;
        deferred.resolve();
      } else {
        _prefix = HTTPS_URL_PREFIX;
        deferred.resolve();
      }
    });
  } else {
    if (protocol === 'ssh')
      _prefix = SSH_URL_PREFIX;
    else
      _prefix = HTTPS_URL_PREFIX;
    deferred.resolve();
  }
  return deferred.promise;
}

function githubCreate(){
  var deferred = Q.defer();
  github.authenticate({
    type: "basic",
    username: _username,
    password: _password
  });
  github.repos.createFromOrg({
    org: ORG,
    name: _appname,
    private: false
  }, function(error, response){
    if (error)
      deferred.reject(new Error(error));
    else
      deferred.resolve();
  });
  return deferred.promise;
}

function clone(){
  cloneCmd = ['git clone', gitUrl(_prefix, BOILERPLATE), _appname].join(' ');
  return execute(cloneCmd);
}

function setOrigin(){
  cmd = ['git', '--git-dir=' + _appname + '/.git', 'remote set-url origin', gitUrl(_prefix, _appname)].join(' ');
  return execute(cmd);
}

function cd(){
  cmd = ['cd', _appname].join(' ');
  return execute(cmd);
}


exports.create = function(appname, protocol){

  var prompt = require('prompt');
  prompt.message = "github";
  var schema = {
    properties: {
      username: {
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

  prompt.start();
  prompt.get(schema, function (error, result) {
    _username = result.username;
    _password = result.password;

    init(appname, protocol).then(function(){
      return githubCreate();
    })
    .then(function(){
      return clone();
    })
    .then(function(){
      return setOrigin();
    })
    .fail(function(error){
      console.log("Doh! Something bad happened...");
      console.log(error.message);
    })
  });
}