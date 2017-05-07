const int = require('signed-varint')
const nat = require('varint')
const zero = require('./zero-escaping.js')

// encode : [[n]] -> Buffer
exports.encode = function (ns) {
	const bytes = [0]
	var integral = false

	for (var i = 0; i < ns.length; i++) {
		// zero sep
		bytes.push(0)
		for (var j = 0; j < ns[i].length; j++) {
			let x = ns[i][j]
			bytes.push(zero.enc(x))
			integral = integral || (x < 0)
		}
	}

	const k = (bytes.length - 1)
	bytes[0] = integral ? (k * 2) + 1 : k * 2
	const E = integral ? int.encode : nat.encode

	return new Buffer(bytes.map(function (n, i) {
		return i === 0 ? nat.encode(n) : E(n)
	}))
}

function is_odd (n) {
	return (n % 2) !== 0
}

// decode : Buffer -> [[n]]
exports.decode = function (buffer) {
	// keep track of where we are in the buffer (bytes)
	var skip = 0

	// decode header
	const header = nat.decode(buffer, skip)
	skip += nat.decode.bytes

	const integral = is_odd(header)
	const N = integral ? (header - 1) / 2 : header / 2
	const D = integral ? int.decode : nat.decode

	const numbers = []

	try {
		for(var n = 0; (
			(skip < buffer.length) && // we didn't run out of bytes to decode
			(n < N) // and we still didn't decode all numbers
		); n++) {

			// decode number
			let raw = D(buffer, skip)
			skip += D.bytes

			if (raw === 0)
				// it's a separator, indicating we are starting a new list
				numbers.push([])
			else
				// it's a regular (zero-escaped) number, append to last list
				numbers[numbers.length - 1].push(zero.dec(raw))
		}

		return numbers
	}
	catch(e) {
		throw new Error('failed to decode\n' + e)
	}
}