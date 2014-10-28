mailgun-docker
==============

A simple mailgun rest api server

#### Memo:
  
#### for share data

    docker rm shareData
    docker stop samba-server
    docker rm samba-server
    docker run -v /data --name shareData busybox true
    docker run --rm -v /usr/local/bin/docker:/docker -v /var/run/docker.sock:/docker.sock svendowideit/samba shareData

#### launch
    
    docker run --rm -it -p 9999:9999 -e APIKEY=[KEY] -e DOMAIN=[DOMAIN].mailgun.org vansteki/mailgun
