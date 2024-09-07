console.log("Servidor socket levantado");
console.log('JavaScript cargado correctamente');

let ulProducts = document.getElementById("products");
const socket = io();

socket.on("newProduct", product =>{
    let linuevoProduct= document.createElement("li");
        linuevoProduct.dataset.id = product.id;
        linuevoProduct.innerHTML=`${product.name}`
        ulProducts.append(linuevoProduct);
});

socket.on('resultado', productId => {
    if (productId) {
        const productElement = ulProducts.querySelector(`li[data-id='${productId}']`);
        if (productElement) {
            ulProducts.removeChild(productElement);
        } else {
            console.error(`Elemento con ID ${productId} no encontrado`);
        }
    } else {
        console.error("ID del producto para eliminar no válido:", productId);
    }
});