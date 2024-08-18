const {Router}= require ("express");
const router = Router();
const CartsManager= require ("../dao/CartsManager");
CartsManager.path = "./src/data/cart.json" ;


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await CartsManager.consultarCartPorId(id);
  res.send(cart);
});

router.get("/", async (req, res) => {
  const carts = await CartsManager.consultarCarts();
  res.send(carts);
});


router.post("/", async (req, res) => {
  await CartsManager.crearCart();
  res.send({ status: "success" });
});


router.post("/:cid/productos/:pid", async (req,res)=>{
    const cartId = req.params.cid;
    const productId= req.params.pid;

    await CartsManager.agregarProductosAlCarrito(cartId, productId);
    res.send({status:sucess})

});

  
module.exports={router}


















module.exports={router}