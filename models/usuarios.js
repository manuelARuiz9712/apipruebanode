const conexion = require("../tools/conexion");
const sha256 = require("sha256");
const jwt = require('jsonwebtoken');



class Usuarios{



constructor(){
this.tableName = "usuarios";
}

  

async  ObtenerPrestadores(){



    let prestadores = await conexion.table("usuarios")
    .join("usuarios_roles","usuarios.cod","=","usuarios_roles.cod_usuario")
    .whereIn("usuarios_roles.cod_rol",[2,3])
    .select("usuarios.cod","usuarios.usuario","usuarios.razon_social");

  return  {
        state:true,
        value:prestadores,
        msg:""
    };



  }

   Logearse (usuario,clave){
  
     return new Promise( async resolve=>{

            clave = sha256(clave);

          let usuarioResult = await  conexion.table("usuarios")
            .where("usuario",usuario)
            .where("clave",clave).select("usuario","razon_social","cod").first();


         if( usuarioResult != null ){

            let rol = await conexion.table("usuarios_roles")
            //.join("roles","usuarios_roles.cod_rol","=","roles.cod")
            .where("cod_usuario",usuarioResult.cod)
            .select("cod_rol").first();

           
           // console.log("Type of",typeof usuarioResult,process.env.KEY_JWT );
            let usuarioData={
                usuario:usuarioResult.usuario,
                razonSocial: usuarioResult.razon_social,
                codigoUsuario:usuarioResult.cod,
                codRol:rol.cod_rol
            };
            let tokenSesion =  jwt.sign(usuarioData, process.env.KEY_JWT);
            usuarioData.token = tokenSesion;
            

             resolve({
                 state:true,
                 msg:"logued",
                 value:usuarioData
             });
            



         }  else{
             resolve({
                 state:false,
                 msg:"Usuario o contraseña incorrectos"
             });
         } 





     } );


   } 


  Registrarse(usuario,clave,razonsocial,rol){


  

return new Promise( async resolve=>{

   

    let consUsuario = await conexion.table(this.tableName ).where("usuario",usuario).first();
    let ExistRol = await conexion.table("roles").where("cod",rol).first();

    if( ExistRol === undefined ){

        resolve({
            state:false,
            value:"",
            msg:"El rol que se envio no es valido"
        });
        return ;

    }
    


    if( consUsuario === undefined ){
        
        clave = sha256(clave);
        let  usuarioId = await conexion.table(this.tableName)
        .insert({
            usuario,
            clave,
            razon_social:razonsocial
        });

        await  conexion.table("usuarios_roles").insert({
            cod_usuario:usuarioId[0],
            cod_rol:rol
        });



        resolve({
            state:true,
            value:"",
            msg:"Usuario registrado correctamente"
        });


    }else{

        resolve({
            state:false,
            value:"",
            msg:"Ya existe un usuario con ese ID"
        });



    }





});



}

async  SuscribirseAprestador(solicitanteId,prestadorId){


    let exist = await conexion.table("solicitantes_prestadores")
    .where("cod_usuario_prestador",prestadorId)
    .where("cod_usuario_solicitante",solicitanteId).first();
    
  if(exist == undefined){

     await conexion.table("solicitantes_prestadores").insert({
        cod_usuario_prestador:prestadorId,
        cod_usuario_solicitante:solicitanteId
       });

       return {
        state:true,
        msg:"Suscrito de forma correcta",
        value:null
    }

  }else{

    return {
        state:false,
        msg:"Ya estas suscrito a este prestador de servicios",
        value:null
    }



  }




}




}


module.exports = Usuarios;