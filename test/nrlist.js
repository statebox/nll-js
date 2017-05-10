const test = require('ava')
const jsc = require('jsverify')
const { check } = require('ava-jsverify')

const u = require('./util.js')
const nll = require('../nrlist.js')

const codec = u.comp(nll.decode, nll.encode)
const is_id = u.is_identity(codec)

const options = {
 	size: 1000000,
	tests: 1000
}

test(
	'decode ∘ encode = identity',
	check(
		'array integer',
		function (t, x) {
			t.deepEqual(x, codec(x))
		},
		options
	)
)
