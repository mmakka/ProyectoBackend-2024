const fs = require("fs")

 class ProductosManager{
    static path

    static async getProductos(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path,{encoding:"utf-8"}))
        }else{
            return [];
        }
    }

    static async addProduct(product={}){
        let productos =await this.getProductos()
        let id = 1;
        if (productos.length > 0) {
            const ids = productos.map(d => Number(d.id)).filter(id => !isNaN(id));
            console.log("IDs de productos:", ids);
            if (ids.length > 0) {
                id = Math.max(...ids) + 1;
            }
        }
        console.log("ID calculado:", id);
        product.id = id; 
        productos.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5))
        return product;
    }


    static async updateProducto(id, aModificar={}){
        let productos =await this.getProductos();

        let indiceProducto=productos.findIndex(p=>p.id===id)
        if(indiceProducto===-1){
            throw new Error(`Error: no existe id ${id}`)
        }
        productos[indiceProducto]={
            ...productos[indiceProducto],
            ...aModificar,
            id
        }
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5))
        return productos[indiceProducto]
    }


    static async deleteProducto(id){
        let productos=await this.getProductos()
        let indiceProducto=productos.findIndex(p=>p.id===id)
        if(indiceProducto===-1){
            throw new Error(`Error: no existe id ${id}`)
        }
        let cantidad0=productos.length
        productos=productos.filter(p=>p.id!==id)   
        let cantidad1=productos.length
       
        await fs.promises.writeFile(this.path, JSON.stringify(heroes, null, 5))

        return cantidad0-cantidad1
    }
}

module.exports=ProductosManager;


