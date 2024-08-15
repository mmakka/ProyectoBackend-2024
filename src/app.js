const express = require("express");
const ProductManager = require('./ProductManager.js');
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/api/productos", async (req,res)=> {
    try{
        const limit = parseInt( req.query.limit,5);
        const productos = await ProductManager.getproducts();
        if (limit > 0 && limit <= productos.length) {
            const someProducts = productos.slice(0, limit);
            res.status(200).json({ success: true, productos: someProducts });
          } else {
            res.status(200).json({ success: true, productos });
          }
        } catch (error) {
            console.log(`ERROR: ${error?.message || "error sin mensaje"}`)
          res.json({
            success: false,
            error:
              "ha ocurrido un error. por favor, intente de nuevo en unos minutos",
          });
        }
      });






app.get("/", (req,res)=>{
    res.send("Holaaa mundo")// ACA VAN MIS PRODUCTOS

})

app.listen(PORT, ()=>{
    console.log("Servidor levantado...!!!");
});