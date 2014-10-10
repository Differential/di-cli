function di(){
  var parser = require('nomnom');
  parser.script('di');


  // NEW PROJECT
  parser.command('create')
    .callback(function(opts){
      try{
        var Git = require('./git');
        Git.create(opts[1], opts.p);
      } catch (ex) {
        console.error(ex.message);
      }
    })
    .help('Create a new app and private repo.  ex: \'di create <appname> \'');


  // MODULUS
  parser.command('set-modulus')
    .callback(function(opts){
      try{
        var Modulus = require('./modulus');
        Modulus.deploy(opts[1]);
      } catch (ex) {
        console.error(ex.message);
      }
    })
    .help('Set modulus environment.  ex: \'di set-modulus <env>\' ')


  parser.parse();
}

exports.di = di;
