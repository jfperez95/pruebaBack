const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
    return (req, res, next)=>{
    
        //Autorización por el header
        const authHeader = req.get('Authorization');
    
        if(!authHeader){
            const error = new Error('No autenticado, no hay token');
            error.statusCode = 401;
            throw error;
        }
    
        //Obtener el token
        const token = authHeader.split(' ')[1];
        let revisarToken
        try {
            revisarToken = jwt.verify(token, 'PRUEBA');
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    
        //Si es un token valido pero hubo un erro
        if(!revisarToken){
            const error = new Error('No autenticado');
            error.statusCode = 401;
            throw error;
        }else if(!roles.includes(revisarToken.rol)){
            const error = new Error('No permitido al rol actual');
            error.statusCode = 401;
            throw error;
        }
    
        next();
    }
}