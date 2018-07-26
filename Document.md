# Document



## System Configuration



### Using Redis

Edit the set the redis configuration on `configure/sysconfig.js`.

```javascript
var sysconf = {
	// ...
    , "use-redis": true
    , "redisServer": { 
        "host": "(host IP or localhost)", \
        "port": 6379, \
        "password": "(pwd if it is set)", \
        "ttl": 260 
    }
	// , ...
};
```





### Over HTTPS

Edit the set the https configuration on `configure/sysconfig.js`.

```javascript
var sysconf = {
    // ...
    , "allowServicePort": { "http" : 8081, "https" : 443 }
    , "allowService" : { "http" : true, "https" : true }
	// ...
    , "https-cert-path": {
        "key": '/etc/letsencrypt/live/(domain.name)/privkey.pem',
        "cert": '/etc/letsencrypt/live/(domain.name)/cert.pem',
        "ca": '/etc/letsencrypt/live/(domain.name)/chain.pem'
    }
};
```



## UI Design



The main UI html5 architecture is located on `views/index.ejs`.





