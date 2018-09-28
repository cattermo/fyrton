#!/bin/bash
npm run generate
cd out
ls
find * -type f -exec curl -u $FTP_USER:$FTP_PASSWORD --ftp-create-dirs -T {} ftp://ftpcluster.loopia.se/fyrton.se/public_html/{} \;