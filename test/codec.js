const test = require('ava')
const jsc = require('jsverify')
const { check } = require('ava-jsverify')

const u = require('./util.js')
const nll = require('..')

const codec = u.comp(nll.decode, nll.encode)
const is_id = u.is_identity(codec)

const options = {
 	size: 1000000,
	tests: 10000
}

test(
	'codec, dec ∘ enc = id',
	check(
		'nearray (nearray integer)',
		function (t, x) {
			t.deepEqual(x, codec(x))
		},
		options
	)
)
