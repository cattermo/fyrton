#!/bin/bash
cd out
find * -type f -exec "curl -u $FTP_USER:$FTP_PASSWORD --ftp-create-dirs -T {} ftp://188.95.227.17/fyrton.se/public_html/{} " \;