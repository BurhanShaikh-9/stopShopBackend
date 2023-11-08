const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../constant')


function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (invalid token)
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };