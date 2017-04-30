var varint = require('signed-varint')

const concata = (a0,a1) => a0.concat(a1)

const isEmptyList = l => !(l && l.length > 0)

exports.encode = function (listOfNumbers) {
	
	if(isEmptyList(listOfNumbers)) {
		throw new Error('must pass non empty list of numbers')
	}

	listOfNumbers.forEach(n => {
		if (typeof n !== 'number') {
			throw new Error('must pass list of numbers, `' + n + '` is not a number')
		}
	})

	const bytes = listOfNumbers
		.map(n => new varint.encode(n))
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