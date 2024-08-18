const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = "src/data/cart.json";

 class ManagerCart {

 consultarCart = async () => {
  console.log("existe", fs.existsSync(path));
  if (fs.existsSync(path)) {
  const data = await fs.promises.readFile(path,"utf-8");
      const carts = JSON.parse(data);
      return carts;
    } else {
      return [];
    }
  };

  crearCart = async () => {
    const cart = await this.consultarCart();
    cart.push({ id:uuidv4(), products: [] });
    return await fs.promises.writeFile(path, JSON.stringify(cart, null,5));
  };

  consultarCartPorId = async (id) => {
    const carts = await this.consultarCart();
    const cart = cart.find((cart) => {
      return cart.id == id;
    });
    return cart ? cart : "producto no encontrado";
  };


  agregarProductosAlCarrito = async (idCart, idProduct) =>{
    const cart= await this.consultarCartPorId(idCart);
    const index = cart.products.findIndex((product)=>{
      return product.id == idProduct;
    })
    if(index == -1){
      cart.products.push({id : idProduct , quantity :1})
    }else{
      cart.products[index].quantity ++
    }

    const carts = await this.consultarCart()
    const cartIndex = carts.findIndex((cartIterador)=>{
      return cartIterador == cart.id
    })
    carts[cartIndex] = cart;

    return await fs.promises.writeFile(path,JSON.stringify( carts,null, "\t"));
  }
}


module.exports=ManagerCart;