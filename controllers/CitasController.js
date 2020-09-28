 const Usuarios = require("../models/usuarios");
 const Citas = require("../models/citas");
 const {request,response} = require("express");





 class CitasController {

    constructor(req=request,res=response){
   
        this.req = req;
        this.res = res;
    }


    async AsignarCitas(){

        let CitasInstance = new Citas();

        let params ={
            citaId: this.req.body.citaId
        }
      

        if( params.citaId === undefined ){
            return this.res.status(500).json( "parametros invalidos" );
        }else{

         let result =  await  CitasInstance.AsignarCupoCita(params.citaId,this.req.user.codigoUsuario);

         if(result.state === true){

            return this.res.status(200).json( result.msg  );

         }else{

            return this.res.status(500).json( result.msg  );

         }

        }
        

    }

    async GetCitasDisponibles(){

        let CitasInstance = new Citas();
        let listado = await  CitasInstance.ObtenerCitasDisponibles( this.req.user.codigoUsuario );

        this.res.status(200).json(listado);

    }


    async CitasCreadas(){

        let CitasInstance = new Citas();
        let result = await CitasInstance.ObtenerCitasCreadas( this.req.user.codigoUsuario );

        return this.res.status(200).json( result.value  );



    }
    async SuscribirsePrestador(){

        let UsuariosInstance = new Usuarios();

        let params = {
            solicitanteId:this.req.body.solicitanteId,
            prestadorId:this.req.body.prestadorId
        };
        if( params.solicitanteId === undefined || params.prestadorId === undefined ){

            return this.res.status(500).json("Parametros faltantes");

        }else{

            let result = await  UsuariosInstance.SuscribirseAprestador(params.solicitanteId,params.prestadorId);

            if( result.state === true ){

                return this.res.status(200).json( result.msg  );

            }else{

                return this.res.status(500).json( result.msg  );

            }

            

        }

    }

    async RegistrarCitas(){

        let params = {
            cupo:this.req.body.cupoTotal,
            descripcion:this.req.body.descripcion,
            fecha:this.req.body.fecha
        }
        let CitasInstance = new Citas();

       if( params.cupo === undefined || params.descripcion === undefined || params.fecha === undefined ){

            return this.res.status(500).json("Parametros faltantes");

       }else{

            let result = await CitasInstance.CrearCita(this.req.user.codigoUsuario,params.cupo,params.descripcion,params.fecha);

            if( result.state === true ){
                return this.res.status(200).json(result.msg);
            }else{
                return this.res.status(500).json(result.msg);
            }


       }



    }
    async ConsultarCuposAsignados(){

        if(this.req.body.citaId  === undefined){

            return this.res.status(500).json("Parametros faltantes");

        }else{

            let CitasInstance = new Citas();
            let result =await  CitasInstance.ConsultarCuposAsignado(this.req.body.citaId );

            return this.res.json(result);

          

        }

    }


 }

 module.exports = CitasController;