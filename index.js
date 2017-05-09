const zero = require('./zero-escaping.js')
const nl = require('./nrlist.js')

// encode : [[n]] -> Buffer
exports.encode = function (ns) {
	const bytes = []
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

	return nl.encode(bytes)
}

function is_odd (n) {
	return (n % 2) !== 0
}

// decode : Buffer -> [[n]]
exports.decode = function (buffer) {
	const bytes = nl.decode(buffer)
	const numbers = []
	try {
		for(var n = 0; n < bytes.length; n++) {
			let x = bytes[n]
			
			if (x === 0)
				// it's a separator, indicating we are starting a new list
				numbers.push([])
			else
				// it's a regular (zero-escaped) number, append to last list
				numbers[numbers.length - 1].push(zero.dec(x))
		}
		return numbers
	}
	catch(e) {
		throw new Error('failed to decode\n' + e)
	}
}