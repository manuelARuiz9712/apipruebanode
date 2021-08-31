const Usuarios = require("../models/usuarios");
const Roles  = require("../models/roles");

const {request,response} = require("express");


class LoginController{

constructor(req=request,res=response){
   
    this.req = req;
    this.res = res;
    

}


async PrestadoresDisponibles(){

    let InstanceUsuarios = new Usuarios();

    let result = InstanceUsuarios.ObtenerPrestadores();

    return this.res.json( (await result).value );    

}

async GetRoles(){

    let InstanceRoles = new Roles();
   return  this.res.json( await InstanceRoles.ListarRoles() );

}


async SuscribirSolicitanteToPrestador(){

    let params= {
        solicitante:this.req.user.codigoUsuario,
        prestador:this.req.body.prestadorId,

    }

    if(  params.prestador === undefined  ){
        return this.res.status(500).json("parametros faltantes");
    }else{

        let InstanceUsuarios = new Usuarios();
        let result =  await InstanceUsuarios.SuscribirseAprestador(params.solicitante,params.prestador);

        if( result.state === true ){

            return this.res.status(200).json(result.msg);

        }else{

            return this.res.status(500).json(result.msg);


        }
    }



}

async Registro(){

   

    let params = {
        usuario:this.req.body.usuario,
        clave:this.req.body.clave,
        razonSocial:this.req.body.razonSocial,
        rol:this.req.body.rol
    };
    console.log("Params",params);
    let InstanceUsuarios = new Usuarios();


    if( params.usuario === undefined || params.clave === undefined || params.razonSocial === undefined || params.rol === undefined ){
        return this.res.status(500).json("Algunos parametros no fueron enviados");

    }else{
        
        let result = await InstanceUsuarios.Registrarse(params.usuario,params.clave,params.razonSocial,params.rol);

        if( result.state === false ){
     
         return this.res.status(500).json(result.msg);
     
        }else{
     
         return this.res.status(200).json(result.msg);
     
     
        }

    }


    

}




 async Login(){

    let params = {
        usuario:this.req.body.usuario,
        clave:this.req.body.clave
    };
    let InstanceUsuarios = new Usuarios();
    console.log({params});
    if( params.usuario === undefined || params.clave === undefined ){

        return this.res.status(500).json("Algunos parametros no fueron enviados");
    

    }else{
      let result = await  InstanceUsuarios.Logearse(params.usuario,params.clave);
    
      if( result.state === true ){

            return this.res.status(200).json(result.value);

      }else{
        return this.res.status(500).json(result.msg);
      }

    }







}


}

module.exports = LoginController;