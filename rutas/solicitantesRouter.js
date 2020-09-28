const express = require("express");
const Middle = require("../middlewares/Solicitantes");
let Router = express.Router();
const CitasController = require("../controllers/CitasController");
const LoginController = require("../controllers/LoginController");

Router.use(Middle);


Router.post("/suscribirseToPrestador",async (req,res)=>{


   let LoginControllerInstance = new LoginController(req,res);
   return await LoginControllerInstance.SuscribirSolicitanteToPrestador();
});

Router.get("/prestadoresDisponibles",async (req,res)=>{

  let LoginControllerInstance = new LoginController(req,res);

  return await LoginControllerInstance.PrestadoresDisponibles();


});

Router.post("/AsignarCupoCita",async (req,res)=>{


    let CitasInstance = new CitasController(req,res);
    return await CitasInstance.AsignarCitas();
 });

 Router.get("/Obtenercitasdisponibles",async(req,res)=>{

   let CitasInstance = new CitasController(req,res);
   return await CitasInstance.GetCitasDisponibles();

 });

 Router.get("/ObtenerCuposAsignados",async(req,res)=>{

   let CitasInstance = new CitasController(req,res);
   return await CitasInstance.GetCitasDisponibles();

 });


module.exports = Router;