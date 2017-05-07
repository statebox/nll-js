[![Build
Status](https://travis-ci.org/statebox/varint-list.svg?branch=master)](https://travis-ci.org/statebox/varint-list) [![PRs
Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# NLL-JS

Encodes list of lists of integers into a `Buffer` according to
https://github.com/statebox/nll-spec

## Usage

Import library

```js
const nll = require('nll')
//=> { encode: [[number]] -> Buffer,
//     decode: Buffer -> [[number]] }
```

Encode

```js
> b = nll.encode([[-1],[0],[],[1]])
//=> <Buffer 0f 00 01 00 02 00 00 04>
```

Decode

```js
> n.decode(b)
[ [ -1 ], [ 0 ], [], [ 1 ] ]
```
