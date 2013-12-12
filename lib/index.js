function di(){
  var args = process.argv;
  if (args.length > 2){
    if (args[2] === 'create' && args.length > 3){
      var Git = require('./git');
      Git.create(args[3]);
    } else {
      console.error(args[2] + ' aint a valid command brah')
    }
  } else {
    console.error("Use 'di create appname'");
  }
}

exports.di = di;