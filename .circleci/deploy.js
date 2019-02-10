const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTPUSERNAME,
  password: process.env.FTPPASS,
  host: process.env.FTPHOST,
  port: 21,
  localRoot: __dirname + "/../out/",
  remoteRoot: "/",
  include: ['*']
};

ftpDeploy.on('uploading', function (data) {
  console.log('totalFilesCount ' +
    data.totalFilesCount +
    ' fileTransferred ' + data.transferredFileCount +
    ' currentFileName ' + data.filename);
});

ftpDeploy.deploy(config, function (err) {
  if (err) console.log(err);
  else console.log('finished');
});