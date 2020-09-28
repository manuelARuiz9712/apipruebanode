require("dotenv").config();

const express = require("express");




//Rutas 
const RutasBasicas = require("./rutas/basicRouter");
const PrestadoresRutas = require("./rutas/PrestadoresRouter");
const SolicitantesRutas = require("./rutas/solicitantesRouter");


const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(RutasBasicas);
app.use("/prestadores",PrestadoresRutas);
app.use("/solicitantes",SolicitantesRutas);



  
  app.listen(process.env.APP_PORT || 5001, () => {
    console.log(`Example app listening at http://localhost:${process.env.APP_PORT || 5001}`)
  });