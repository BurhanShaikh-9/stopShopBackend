const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../constant')

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(" ")[1];
    // console.log(token, 'tokeenn');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not found' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        // console.log('Token decoded successfully:', decoded);
        req.user = decoded.user;
        next();
    } catch (error) {
        // console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { authenticateToken };