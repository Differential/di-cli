function di(){
  var parser = require('nomnom');
  var execute = require('./lib').execute;
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
    .help('Set modulus environment.  ex: \'di set-modulus <env>\'');

// ln -s ../../meteor-workers/ packages/workers
  parser.command('test-package')
    .callback(function(opts){
      var pkgName = opts[1];
      var cmd = '';
      if(opts.unlink) {
        cmd = 'rm -rf packages/' + pkgName;
      } else {
        cmd = 'ln -s ../../' + pkgName + ' packages/' + pkgName;
      }
      execute(cmd);
    })
    .options({
      unlink: {
        abbr: 'u',
        flag: true,
        help: 'Use to undo.'
      }
    })
    .help('Swap package for a local version. ex: \'di sym <pkg-name> \'');


  parser.parse();
}

exports.di = di;
