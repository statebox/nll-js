const deepEQ = require('chape').jsc.utils.isEqual

exports.comp = function (G, F) {
	return function (x) {
		return G(F(x))
	}
}

exports.is_identity = function (f) {
	return function (x) {
		return deepEQ(x, f(x))
	}
}