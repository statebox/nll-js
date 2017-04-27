var varint = require('varint')

const concata = (a0,a1) => a0.concat(a1)

exports.encode = function (listOfNumbers) {
	const bytes = listOfNumbers
		.map(n => new varint.encode(n))
		.reduce(concata)
	return new Buffer(bytes)
}

exports.decode = function (buffer) {
	var numbers = []
	var skip = 0
	try {
		while(true) {
			numbers.push(varint.decode(buffer, skip))
			skip += varint.decode.bytes
		}
	}
	catch(e) {
		return numbers
	}
}
