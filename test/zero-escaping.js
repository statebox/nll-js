const test = require('tape').test
const check = require('chape')
const jsc = require('jsverify')
const u = require('./util.js')
const z = require('../zero-escaping.js')

const zero_free = function (n) {
	return z.enc(n) !== 0
}

test('zero escaping, ∀x. 0 ∉ enc(x)', function (t) {
	check(jsc.forall('integer', zero_free), t)
	t.end()
})

test('zero escaping, dec ∘ enc = id', function (t) {
	jsc.assert(jsc.forall('integer', u.is_identity(u.comp(z.dec, z.enc))))
	t.end()
})