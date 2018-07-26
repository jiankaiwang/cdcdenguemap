/*
 * secret or configure information
 */
var sysconf = {
    "version" : "0.0.1"
    , "availableLang" : "en zh_TW"
    , "defaultLang" : "zh_TW"
    , "site_description" : "CDC Dengue Map is the GIS system for dengue determined cases in Taiwan."
    , "error_emails_to" : "null"
    , "api_allow_host" : "localhost 127.0.0.1"
    , "allowServicePort": { "http" : 8081, "https" : 443 }
    , "allowService" : { "http" : true, "https" : false }
    , "use-redis": false
    , "redisServer": { 
        "host": "", "port": 6379, "password": "", "ttl": 260 
    }
    , "https-cert-path": {
        "key": '/etc/letsencrypt/live/(domain.name)/privkey.pem',
        "cert": '/etc/letsencrypt/live/(domain.name)/cert.pem',
        "ca": '/etc/letsencrypt/live/(domain.name)/chain.pem'
    }
};


/*
 * export list
 */
exports.sysconf = sysconf;