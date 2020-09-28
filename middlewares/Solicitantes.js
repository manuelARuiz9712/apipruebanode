const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

    let tokenText = req.headers['authorization'];


    if (tokenText) {
        const bearer = tokenText.split(' ');
        const bearerToken = bearer[1];
       
        try{

            let tokenDecoded = jwt.verify(bearerToken,process.env.KEY_JWT);
           
            //Rol prestador y ambos;
            if( tokenDecoded.cod_rol === 1 || tokenDecoded.cod_rol === 3   ){
                req.user = tokenDecoded;
                next();

            }else{
                res.status(401).json("El usuario no tiene permisos para ingregar a estos datos");
            }
         
         
    
        }catch(e){
            res.status(401).json("Authenticacion Invalida");
        }

    } else {
        // Forbidden
        res.status(401).json("Authenticacion Invalida");
      }






  
}