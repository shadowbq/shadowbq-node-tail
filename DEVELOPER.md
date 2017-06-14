```
shadowbq   master  ~  sandbox-public  shadowbq-node-tail  cat package.json 
{
  "name": "shadowbq-node-tail",
  "version": "1.0.1",
  "author": "shadowbq <shadowbq@gmail.com>",
  "preferGlobal": "false",
  "bin": {
    "node-tail": "./bin/node-tail"
  },
  "dependencies": {
    "body-parser": "^1.10.0",
    "commander": "~1.1.1",
    "cookie-parser": "^1.3.3",
    "express": "^4.10.4",
    "express-session": "^1.9.3",
    "hogan.js": "~3.0.2",
    "morgan": "^1.2.1",
    "pryjs": "^1.0.3",
    "socket.io": "latest"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/shadowbq/shadowbq-node-tail.git"
  },
  "engines": {
    "node": "latest"
  }
}
 shadowbq   master  ~  sandbox-public  shadowbq-node-tail  npm test

> shadowbq-node-tail@1.0.1 test /home/shadowbq/sandbox-public/shadowbq-node-tail
> echo 'Error: no test specified'

Error: no test specified

 shadowbq   master  ~  sandbox-public  shadowbq-node-tail  git tag 1.0.1
 shadowbq   master  ~  sandbox-public  shadowbq-node-tail  git push origin master --tags
Username for 'https://github.com': shadowbq
Password for 'https://shadowbq@github.com': 
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/shadowbq/shadowbq-node-tail.git
 * [new tag]         1.0.1 -> 1.0.1
 shadowbq   master  ~  sandbox-public  shadowbq-node-tail  npm publish
+ shadowbq-node-tail@1.0.1
```
