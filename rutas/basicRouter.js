const express = require("express");
let Router = express.Router();
const LoginController = require("../controllers/LoginController");


Router.get('/', (req, res) => {
    res.send('Hello World!')
  });

Router.post("/Registro",async (req,res)=>{

    let LoginControllerIsntance = new LoginController(req,res);
    let result = await LoginControllerIsntance.Registro();

    return result;

});
Router.post("/Login", async (req,res)=>{

    let LoginControllerIsntance = new LoginController(req,res);
    let result = await LoginControllerIsntance.Login();

    return result;
    

});
Router.get("/Getroles",async(req,res)=>{

    let LoginControllerIsntance = new LoginController(req,res);
    let result = await LoginControllerIsntance.GetRoles();

    return result;


} );

module.exports = Router;