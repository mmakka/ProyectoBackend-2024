const {Router}= require ("express");
const router = Router();
const CartsManager = require('../dao/CartsManager');


CartsManager.path = "src/data/cart.json";

router.get("/:cid/", async (req, res) => {
  const id = req.params.cid;
  const cart = await CartsManager.consultarCartporId(id);
  res.send(cart);
});


router.post("/", async (req, res) => {
  await CartsManager.crearCart();
  res.send({ status: "success" });
});

router.post("/:cid/product/:pid", async (req,res)=>{
    const cartId = req.params.cid;
    const productId= req.params.pid;
    await CartsManager.agregarProductosAlCarrito(cartId, productId);
    res.send({status:"sucess"});

});

module.exports={router}
















