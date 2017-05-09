const int = require('signed-varint')
const nat = require('varint')

function concat (a,v) {
    return a.concat(v)
}

const nat_enc = function (n) { return nat.encode(n) }
const int_enc = function (n) { return int.encode(n) }
const nat_dec = function (x, s) { return nat.decode(x, s) }
const int_dec = function (x, s) { return int.decode(x, s) }

// encode : [[n]] -> Buffer
exports.encode = function (ns) {
    
    var integral = false

    for (var i = 0; i < ns.length; i++) {
        integral = integral || (ns[i] < 0)
	}

    const k = ns.length
    const l = integral ? (k * 2) + 1 : k * 2
    const header = nat_enc(l)

    const E = integral ? int_enc : nat_enc
    const bs = ns.map(E).reduce(concat, [])

    
    return new Buffer(header.concat(bs))
}

function is_odd (n) {
	return (n % 2) !== 0
}

// decode : Buffer -> [[n]]
exports.decode = function (buffer) {
	// keep track of where we are in the buffer (bytes)
	var skip = 0
    
    // decode header
	const header = nat_dec(buffer, skip)
	skip += nat.decode.bytes

	const integral = is_odd(header)

    // nr of items
	const k = integral ? (header - 1) / 2 : header / 2    
    const D = integral ? int_dec : nat_dec
    
    function bytes () {
        return integral ? int.decode.bytes : nat.decode.bytes
    }

	const numbers = []

	try
    {
        // while:
        // we didn't run out of bytes to decode
        // and we still didn't decode all numbers
		for(var n = 0; (skip < buffer.length) && (n < k); n++)
        {
			// decode number
			numbers.push(D(buffer, skip))
            skip += bytes()
        }
	
    	return numbers
	}
	catch(e) {
		throw new Error('failed to decode\n' + e)
	}
}