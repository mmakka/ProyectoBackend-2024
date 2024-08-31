const express = require("express");
const {router: productosRouter} = require("./routes/productos.router.js")
const {router:cartRouter} = require('./routes/cart.router.js');
const {router:viewsRouter }= require('./routes/views.Router.js')
const {engine} = require("express-handlebars");
const { Server: SocketServer } = require('socket.io');

const path = require("path");
// const { Server } = require("http");
const PORT = 8080;
let serverSocket;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("handlebars",engine());
app.set("view engine", "handlebars");
//app.set("views","./src/views");
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, '/public')));

 app.use(express.static("src/public"))

app.use("/api/products/",
    (req,res,next)=>{
        req.io= io
        next()
    },productosRouter);
app.use("/",viewsRouter)
app.use("/carts",cartRouter);


const serverHTTP = app.listen(PORT, ()=>{
    console.log("Servidor levantado...!!!");
});
const io = new SocketServer(serverHTTP);



