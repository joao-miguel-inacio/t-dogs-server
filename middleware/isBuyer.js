const { expressjwt: jwt } = require("express-jwt")

function isBuyer (req) {
	jwt({
		secret: process.env.TOKEN_SECRET,
		algorithms: ["HS256"],
		requestProperty: "payload",
		getToken: req.headers.authorization.split(" ")[1],
	})
	console.log("req.payload", req.payload)
}

module.exports = isBuyer
