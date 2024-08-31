const {Router}= require ("express");
const ProductosManager = require("../dao/ProductosManager");
const router = Router();


router.get("/home", async(req, res) => {
    try {
        const products = await ProductosManager.getProductos();
        return res.status(200).render("home", {products });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/realtimeproducts", async(req, res) => {
    try {
        const products = await ProductosManager.getProductos();
        return res.status(200).render("realTimeProducts", {products});
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return res.status(500).send("Internal Server Error");
    }
});


router.post("/realtimeproducts", async (req, res)=>{
    let {name, ...otros}= req.body 
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete el name`})
    }
    let productos=await ProductosManager.getProductos()
    let existe=productos.find(p=>p.name && p.name.toLowerCase() === name.toLowerCase())
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe un producto ${name}`})
    }
    // validar todo lo que se necesite...
    try {
        let newProduct =await ProductosManager.addProduct({name, ...otros})
        if(req.io){
            req.io.emit("product",newProduct)
        }else{
            console.log("websocket no esta disponible en req.io");
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newProduct});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
   }
});
















module.exports={router}