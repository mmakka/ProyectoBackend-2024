const express = require("express");
const fs = require("fs")
const {router: productosRouter} = require("./routes/productos.router.js")
const{router:cartRouter } = require("./routes/cart.router.js");

const path = require("path");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/productos/", productosRouter);
app.use("/api/carts/", productosRouter);


app.listen(PORT, ()=>{
    console.log("Servidor levantado...!!!");
});



