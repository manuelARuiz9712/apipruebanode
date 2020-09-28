const express = require("express");
const Middle = require("../middlewares/Prestadores");
let Router = express.Router();
const CitasController = require("../controllers/CitasController");

Router.use(Middle);

Router.post("/CrearCitas",async(req,res)=>{

let CitasInstance = new CitasController(req,res);
return await CitasInstance.RegistrarCitas();


});

// Router.post("/CrearCitas",async(req,res)=>{

//     let CitasInstance = new CitasController(req,res);
//     return await CitasInstance.RegistrarCitas();
    
    
// });

Router.post("/ObtenerCitasCreadas",async(req,res)=>{

    let CitasInstance = new CitasController(req,res);
    return await CitasInstance.CitasCreadas();
    
    
});

Router.post("/ConsultarCuposAsignados",async(req,res)=>{

    let CitasInstance = new CitasController(req,res);
    return await CitasInstance.ConsultarCuposAsignados();
    
    
});

    

module.exports = Router;


