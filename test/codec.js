const test = require('chape').test
const jsc = require('chape').jsc

const u = require('./util.js')
const nll = require('..')

const codec = u.comp(nll.decode, nll.encode)
const property = u.is_identity(codec)

test('codec, dec ∘ enc = id', function (t) {
	t.check(jsc.forall('nearray (nearray integer)', property))
	t.end()
})

test('codec, dec ∘ enc = id (corner cases)', function (t) {
	t.ok('[]', property([]))
	t.ok('[[]]', property([[]]))
	t.ok('[[0],[]]', property([[0],[]]))
	t.ok('[[], [0]]', property([[], [0]]))
	t.end()
})

test('codec, dec ∘ enc = id (for large numbers)', function (t) {
	t.ok(property([[128], [65536], [Math.pow(2,30)]]))
	t.end()
})