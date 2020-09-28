const conexion = require("../tools/conexion");


class Roles{

    constructor(){

    }

    async ListarRoles(){
        return await conexion.table("roles").select("*");
    }


}
module.exports = Roles;