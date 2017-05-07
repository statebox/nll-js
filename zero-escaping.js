// make sure input is number
function ensureNumber (n) {
	if (typeof n !== 'number') {
		throw new Error('this codec only works with numbers, `' + n + '` is not a number')
	} else {
        return n
    }
}

// zero escaping
exports.enc = function (x) {
    return ensureNumber(x) < 0  ? x : x + 1
}

exports.dec = function (x) {
    return ensureNumber(x) <= 0 ? x : x - 1
}
