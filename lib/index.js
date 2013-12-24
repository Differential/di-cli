function di(){
  var help = "Use 'di create appname'";
  var argv = require('optimist').argv

  switch (argv._[0]) {
    case 'create':
      var Git = require('./git');
      Git.create(argv._[1], argv.p);
      break;
    default:
      console.log(help);
  }
}

exports.di = di;