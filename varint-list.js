var varint = require('signed-varint')

function concata (a0, a1) {
	return a0.concat(a1)
}

function isEmptyList (l) {
	return !(l && l.length > 0)
}

function encode (n) {
	return varint.encode(n)
}

exports.encode = function (listOfNumbers) {
	
	if(isEmptyList(listOfNumbers)) {
		throw new Error('must pass non empty list of numbers')
	}

	listOfNumbers.forEach(function (n) {
		if (typeof n !== 'number') {
			throw new Error('must pass list of numbers, `' + n + '` is not a number')
		}
	})

	const bytes = listOfNumbers
		.map(encode)
		.reduce(concata)
	return new Buffer(bytes)
}

exports.decode = function (buffer) {
	var numbers = []
	var skip = 0
	try {
		while(skip < buffer.length) {
			numbers.push(varint.decode(buffer, skip))
			skip += varint.decode.bytes
		}
		
		return numbers;
	}
	catch(e) {
		throw new Error('failed to decode\n' + e)
	}
}