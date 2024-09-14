const jwt = require ("jsonwebtoken")

exports.auth = (req, res, next) => {
    let authHeader = undefined;
    if(req.headers.authorization) authHeader = req.headers.authorization;
    if(req.session.token) authHeader = req.session.token;
    
    const token = authHeader && authHeader.split('')[1];
    if (!token) return res.status(401).json({message: 'Token no proporcionado'});
    console.log('Verified')

    jwt.verify(token, process.env.KEY_SECRET, (err, payload) => {
        if (err) return res.status(403).json({message: "Token invalido"});
        console.log(payload);
        req.user = payload;
        next()
    })
}