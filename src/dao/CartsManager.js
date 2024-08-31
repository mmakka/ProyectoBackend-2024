const fs = require("fs");
const { v4: uuidv4 } = require('uuid');



    class CartsManager {
      static path;

      static setPath(newPath) {
        this.path = newPath;
      }

      static async consultarCart() {
        try {
          if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
          } else {
            return [];
          }
        } catch (error) {
          console.error('Error al consultar el carrito:', error);
          return [];
        }
      }

      static async crearCart() {
        try {
          const carts = await this.consultarCart();
          carts.push({ id: uuidv4(), products: [] });
          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5));
          return 'Carrito creado exitosamente.';
        } catch (error) {
          console.error('Error al crear el carrito:', error);
          return 'Error al crear el carrito.';
        }
      }

      static async consultarCartporId(id){
        try{
          const carts = await this.consultarCart();
          const cart = carts.find(cart => cart.id === id);
          return cart ? cart : 'Carrito no encontrado';
        
        } catch (error) {
          console.error('Error al consultar el carrito por ID:', error);
          return 'Error al consultar el carrito por ID.';
        }
      }

      static async agregarProductosAlCarrito(idCart, idProduct) {
        try {
          // Consultar el carrito por ID
          const cart = await this.consultarCartporId(idCart);
          if (typeof cart === 'string') {
            // Si el carrito no se encuentra, devolver el mensaje
            return cart;
          }
    
          // Verificar si el producto ya está en el carrito
          const index = cart.products.findIndex(product => product.id === idProduct);
          if (index === -1) {
            // Producto no encontrado, agregar con cantidad 1
            cart.products.push({ id: idProduct, quantity: 1 });
          } else {
            // Producto encontrado, incrementar la cantidad
            cart.products[index].quantity++;
          }
    
          // Actualizar el carrito en la lista de carritos
          const carts = await this.consultarCart();
          const cartIndex = carts.findIndex(cartIterador => cartIterador.id === idCart);
          if (cartIndex !== -1) {
            carts[cartIndex] = cart;
          } else {
            // Devolver mensaje si el carrito no se encuentra en la lista
            return 'Carrito no encontrado en la lista de carritos';
          }
    
          // Guardar los cambios en el archivo JSON
          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
          return 'Producto agregado al carrito exitosamente.';
        } catch (error) {
          console.error('Error al agregar producto al carrito:', error);
          return 'Error al agregar producto al carrito.';
        }
      }
    }

   

module.exports=CartsManager;