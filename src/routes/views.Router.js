const {Router}= require ("express");
const ProductosManager = require("../dao/ProductosManager");
const router = Router();

router.get("/home", async(req, res) => {
    try {
        const products = await ProductosManager.getProductos();
        res.setHeader('Content-Type','text/html');
        return res.status(200).render("home", {products});
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductosManager.getProductos();
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).render('realTimeProducts',{ products });
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return res.status(500).send('Internal Server Error');
    }
});








module.exports={router}