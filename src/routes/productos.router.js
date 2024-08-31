const {Router}= require ("express");
const router = Router();
const ProductosManager= require("../dao/ProductosManager.js")
ProductosManager.path = "./src/data/productos.json" ;


router.get("/", async(req, res)=>{
    let productos = await ProductosManager.getProductos()
    let {limit, skip}=req.query
    if(limit){
        limit=Number(limit)
        if(isNaN(limit)){
            return res.status(400).send("El argumento limit tiene que ser numerico")
        }
    }else{
        limit=productos.length;
    }
    if(skip){
        skip=Number(skip)
        if(isNaN(skip)){
            return res.status(400).send("El argumento skip tiene que ser numerico")
        }
    }else{
        skip=0;
    }
    let resultado=productos.slice(skip, skip+limit)
    res.status(200).send(resultado)
})

  // GET X IID FUNCIONA
  router.get("/:id", async(req, res)=>{
    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        return res.status(400).send("id debe ser numerico")
    }
    let productos= await ProductosManager.getProductos()
    console.log(productos);
    
    let producto=productos.find(p=>p.id===id)
    if(!producto){
        return res.status(400).send(`Producto con id ${id} not found`)
    }
    res.send(producto);
  })
  

  //metodo post(CREATE)
  router.post("/", async (req, res)=>{
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


  //PUT
  router.put("/:id", async(req, res)=>{
      let {id}=req.params
      id=Number(id)
      if(isNaN(id)){
          res.setHeader('Content-Type','application/json');
          return res.status(400).json({error:`id debe ser numerico`})
      }
      let productos;
      try {
          productos=await ProductosManager.getProductos();
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
      let producto= productos.find(p=>p.id===id)
      if(!producto){
          res.setHeader('Content-Type','application/json');
          return res.status(400).json({error:`Producto con id ${id} not found`})
      }
      let aModificar=req.body
      delete aModificar.id
  
      // validaciones
      if(aModificar.name){
          let existe= productos.find(p=>p.name && p.name.toLowerCase()===aModificar.name.toLowerCase() && p.id!==id)
          if(existe){
              res.setHeader('Content-Type','application/json');
              return res.status(400).json({error:`Ya hay otro producto llamado ${aModificar.name}`})
          }
      }
      try {
          let productoModificado = await ProductosManager.updateProducto(id, aModificar)
          res.setHeader('Content-Type','application/json');
          return res.status(200).json({productoModificado});
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

  // DELETE
  router.delete("/:id", async(req, res)=>{
      let {id}=req.params
      id=Number(id)
      if(isNaN(id)){
          res.setHeader('Content-Type','application/json');
          return res.status(400).json({error:`id debe ser numerico`})
      }
      try {
          let resultado=await ProductosManager.deleteProducto(id)
          if(resultado>0){
              res.setHeader('Content-Type','application/json');
              return res.status(200).json({payload:"producto eliminado...!!!"});
          }else{
              res.setHeader('Content-Type','application/json');
              return res.status(500).json({error:`Error al eliminar...`})
          }
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