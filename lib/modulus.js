var deploy = function(env){
  var fs = require('fs');
  var exec = require('child_process').exec;
  var config;

  if (!env)
    throw new Error('No environment specified!');

  try{
    config = fs.readFileSync(process.env.HOME + '/.dirc');
    config = JSON.parse(config);
  } catch (ex) {
    throw new Error('Error reading config file.  Make sure you have a valid .dirc file in your home directory!');
  }

  config = config.modulus.env[env];

  if (!config)
    throw new Error('Environment not found in config file!');

  if (!config.username || !config.password || !config.api_uri)
    throw new Error('Config requires \'username\', \'password\', and \'api_uri\'');


  var cmdLogout = "modulus logout";
  var cmdSetUri = "modulus config set api_uri " + config.api_uri;
  var cmdLogin = "modulus login --username " + config.username + " --password " + config.password

  var login = function(error, stdout, stderr){
    console.log('Attemping to login ' + config.username + ' at ' + config.api_uri);

    var cmd = cmdSetUri + " && " + cmdLogin;
    exec(cmd, function(error, stdout, stderr){
      console.log(stdout);
    });

  };

  exec(cmdLogout, login);
}

exports.deploy = deploy;
