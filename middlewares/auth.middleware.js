const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error('No token');
        }
        
        const decoded = jwt.verify(token, config.get('secretJwt'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: `Unauthorized user: ${error}`});
    }
}