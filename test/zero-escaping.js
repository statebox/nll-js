const test = require('ava')
const jsc = require('jsverify')
const { check } = require('ava-jsverify')

const u = require('./util.js')
const z = require('../zero-escaping.js')

const zero_free = function (n) {
	return z.enc(n) !== 0
}

test(
  'zero escaping, ∀x. 0 ∉ enc(x)',
  check(jsc.integer, function (t, x) {
    t.true(zero_free(x))
  })
)

const is_id = u.is_identity(u.comp(z.dec, z.enc))
test(
  'zero escaping, ∀x. 0 ∉ enc(x)',
  check(jsc.integer, function (t, x) {
    t.true(is_id(x))
  })
)
