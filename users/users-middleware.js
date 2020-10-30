const { JsonWebTokenError } = require("jsonwebtoken")

function restrict() {
	return async (req, res, next) => {
		try {
			// express-session will automatically get the session ID from the cookie
			// header, and check to make sure it's valid and the session for this user exists.
			// if (!req.session || !req.session.user) {
			// 	return res.status(401).json({
			// 		message: "Invalid credentials",
			// 	})
			// }
			const token = req.headers.authorization
			if(!token) {
				return res.status(401).json({
					message: "Invalid credentials"
				})
			}

			jwt.verify(token, "keep it secret", (err, decoded) => {
				if(err){
					return res.status(401).json({
						message: "invalid credentials",
					})
				}

				//console.log(decoded)

				req.token = decoded

				next()

			})

			
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}