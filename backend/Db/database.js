const mysql=require("mysql")
const PanelDB=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"panel",
    port:3307
})

module.exports=PanelDB;