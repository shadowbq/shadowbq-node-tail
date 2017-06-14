node-tail
=========

  Web `tail` - display last part of a file. This is a io-redirect of the OS native spawn implementation of the GNU tool `tail`.

Install
-------

```bash
npm install -g node-tail
```

Usage
-----

Create your own private key and certificate for the server, [read more](http://nodejs.org/api/tls.html).

The server will attempt to use TLS/SSL if cert and key are made available. Alternatively, you can use `--skip_tls` to use http.

Indicate your private key and certificate paths with the command parameters `--cert` and `--key`.

```bash
Usage: node-tail [options] file

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -n, --lines <lines>    output the last NUM lines, instead of the last 10
  --retry                keep trying to open a file if it is inaccessible
  -H, --host <host>      custom Hostname
  -p, --port <port>      custom port
  --cert <cert>          https server cert file path
  --key <key>            https server key file path
  --skip_tls             use http instead of https
  -m, --mode <mode>      log display mode
  -s, --secret <secret>  string used for signing cookies
  --user <user>          auth user name
  --pass <password>      auth password
```

Example:

```bash
node-tail -p 4000 --cert cert.pem --key key.pem ~/file.log
```

Open in browser: [https://localhost:4000/](https://localhost:4000/)

Log display modes
-----------------

There are two log display modes: `scrollBottom` and `scrollTop`. Default mode is `scrollBottom`.

`scrollBottom` will scroll the document to the bottom automatically when tail receives new input data. Tail data will be accumulated in the document.

`scrollTop` will set new tail input data to the document from the top.

Extra
-----

Basic user authentication is provided with the parameters `--user` and `--pass`.
Login form will appear after accessing the server.
Provide your custom secret string to sign the cookies with parameter `--secret`.

```bash
node-tail -p 4000 --cert cert.pem --key key.pem --user hello --pass world --secret helloworld ~/file.log
```
