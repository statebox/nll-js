# Encode numbers as list of varints

Import library

```js
const lvi = require('varint-list')
//=> { encode: [Function], decode: [Function] }
```

Encode

```js
const b = lvi.encode([1,2,3,0, 4])
//=> <Buffer 01 02 03 00 04>
```

Decode

```js
> lvi.decode(b)
[ 1, 2, 3, 0, 4 ]
```
