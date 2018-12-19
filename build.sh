#!/bin/bash
npm run generate
cd out
ls
find * -type f -exec curl --verbose --progress-bar --ipv4 --connect-timeout 8 \
     --max-time 120 --retry 128 --ftp-ssl --disable-epsv --ftp-pasv \
     -u $FTP_USER:$FTP_PASSWORD --ftp-create-dirs -T {} ftp://ftpcluster.loopia.se/{} \;