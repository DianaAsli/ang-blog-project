const {
    verifyToken
} = require('../services/userService');

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
        } catch (err) {
            res.clearCoookie('token');
            return res.statis(401).json({message:'Invalid or expired token.'})
        }
    }
    next();
};