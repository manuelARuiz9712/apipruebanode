const conexion = require("../tools/conexion");
const moment = require("moment");
const { join } = require("../tools/conexion");



class citas{


constructor(){

}

 async CrearCita(usuarioId,cupoTotal,descripcion,fecha){

    let fechaActual = moment();
    let fechaCita = moment(fecha);
    if(  fechaCita.isAfter(fechaActual)  ){

       await conexion.table("citas").insert({
            cupos_disponibles:cupoTotal,
            cupos_totales:cupoTotal,
            descripcion:descripcion,
            fecha:fecha,
            cod_usuario_prestador:usuarioId
        });

        return  {
            state:true,
            msg:"La cita ha sido creada con exito"
        };



    }else{
        return  {
            state:false,
            msg:"La fecha no puede ser anterior o igual a la fecha actual"
        };
    }


}



async ObtenerCitasCreadas(usuarioId){

   return  await conexion.table("citas")
    .where("cod_usuario_prestador",usuarioId)
    .select("*");


}

/**
 * 
 * @param {*} usuarioId 
 * dependiendo de que prestadores tengo suscritos
 */
async ObtenerCitasDisponibles(usuarioId){

/*     let queryIdsPrestadores = conexion
    .table("solicitantes_prestadores")
    .where("cod_usuario_solicitante",usuarioId)
    .select("cod_usuario_prestador") */

    return  await conexion.table("citas")
    .join("usuarios","citas.cod_usuario_prestador","=","usuarios.id")
     .where("cupos_disponibles",">",0)
    //.whereIn("cod_usuario_prestador",queryIdsPrestadores)
     .select("citas.*","usuarios.usuario");
 
 
 }

async AsignarCupoCita(citaId,usuarioId){

   
    let exist = await  conexion.table("cupos")
    .where("cod_usuario_solicitante",usuarioId)
    .where("cod_cita",citaId).first();
    console.log("cupo ex",exist);

    
    if( exist === undefined ){


        let consultaCupos =   await conexion.table("citas").where("cod",citaId).select("cupos_disponibles").first();



        if( consultaCupos.cupos_disponibles >0 ){

            await conexion.table("cupos").insert({
                cod_usuario_solicitante:usuarioId,
                cod_cita:citaId
            });

            await conexion.table("citas").where("cod",citaId).update({
                cupos_disponibles:consultaCupos.cupos_disponibles-1
              });

              return {
                state:false,
                msg:"Su cupo  ha sido asignado"
            }


        }else{
            return {
                state:false,
                msg:"No hay cupos disponibles"
            }

        }

      



    }else{

        return {
            state:false,
            msg:"Usted ya tiene un cupo asignado en esta cita"
        }
    }



}


async ConsultarCuposAsignado(citaId){


    return await conexion.table("cupos")
    .join("usuarios","cupos.cod_usuario_solicitante","=","usuarios.cod")
    .where("cupos.cod_cita",citaId)
    .select("usurios.usuario","usuarios.razon_social");


}












}

module.exports = citas;