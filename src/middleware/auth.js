const JWT = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
	let header = req.get('Authorization');
	let signedToken;
	if (header) {
		signedToken = header.split(' ')[1];
	}

	if (signedToken) {
		try {
			let decodedToken = JWT.verify(signedToken, process.env.JWT_SECRET);
			console.log(('decoded token', decodedToken));
			req.user_token = decodedToken;
			next();
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(400).json({ message: 'You are not authorized!' });
	}
};
module.exports = verifyJWT;
