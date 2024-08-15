const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

class ProductManager {
    constructor(path){
        this.path = path;
    };

    async getproducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    addProduct = async (product) => {
        const { title, description, price, thumbnail, stock , category} = product;
        if (!title || !description || !price || !stock || !category) {
        console.log("El producto no pudo crearse, debe tener todos los campos requeridos,intentelo nuevamente");
          return;
        }
        const products = await this.getproducts();
        product.code = uuidv4();
        let id = 1
        if(products.length>0){
            id=Math.max(...products.map(d=>d.id))+1
        }
        products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,5))
        console.log(`Nuevo producto agregado`);
};

getProductById = async (id) => {
    const products = await this.getproducts();
    let product;
    if (products.length > 0) {
      product = products.find((producto) => producto.id===id);
    }
    if (!product) console.log(`No existe un producto con code: ${id}`);
    return product;
  };


  async updateProduct(id, productUpdate) {
    const products = await this.getproducts();
    const productIdx = products.findIndex(product =>product.id === id);

    if (productIdx === -1) {
        console.log(`No existe un producto con id: ${id}. No se realiza ninguna actualización.`);
        return;
    }

    products[productIdx] = { ...products[productIdx], ...productUpdate };
    await fs.promises.writeFile(this.path,JSON.stringify(products,null,1));
    console.log(`Producto con id: ${id} actualizado.`);
}

deleteProduct = async (id) => {
    const products = await this.getproducts();
    let filteredProducts = [];

    if (products.length > 0) {
      filteredProducts = products.filter((p) => p.id !==id);
    }
    if (filteredProducts.length === products.length - 1) {
      await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null,"\t"));
      console.log(`El producto con id: ${id} fue eliminado.`);
    } else {
      console.log(`No existe un producto con id: ${id}.`);
    }
 }


}


const productManager = new ProductManager("./src/productos.json");

const app= async()=>{
console.log(
    await productManager.deleteProduct(1));
}
module.exports= {ProductManager};
app();













