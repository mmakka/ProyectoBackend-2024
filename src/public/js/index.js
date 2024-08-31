console.log("Servidor socket levantado");
console.log('JavaScript cargado correctamente');
let ulProducts = document.getElementById("products");

const socket = io();

socket.on("product",product =>{
    let linuevoProduct= document.createElement("li");
        linuevoProduct.innerHTML=`${product.name}`
        ulProducts.append(linuevoProduct);
});

