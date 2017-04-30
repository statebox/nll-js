const jsc = require('jsverify')
const varints = require('../index.js')
const R = require('ramda')

const isIdentity = jsc
	.forall('nearray integer', function(nats) {
		const e = varints.encode(nats)
		const d = varints.decode(e)
		return R.equals(d, nats)
	})

jsc.assert(isIdentity)
