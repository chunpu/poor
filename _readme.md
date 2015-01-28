Usage
---

Phantomjs test

```sh
browserify test/*.js | poor
```

SauceLabs test

```sh
browserify test/*.js | poor -b ie:6..8,chrome
```

Options
---

```sh
$ poor

  Usage: poor [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -b, --browsers <browsers>  use sauce labs tests, e.g. ie:6..8,android,chrome:stable..
    -R, --reporter [value]     mocha reporter, default is spec
    -u, --ui [value]           mocha ui like bdd, tdd
    --timeout [value]          mocha async timeout
    --shim [value]             if use es-shim, default is true
    --title [value]            web page title
```
