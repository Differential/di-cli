var Q = require("q");

var execute = function(cmd){
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
};

module.exports.execute = execute;
