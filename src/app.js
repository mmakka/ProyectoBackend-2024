const express = require("express");
const { router: productosRouter } = require("./routes/productos.router.js");
const { router: cartRouter } = require('./routes/cart.router.js');
const { router: viewsRouter } = require('./routes/views.Router.js');
const { engine } = require("express-handlebars");
const { Server: SocketServer } = require('socket.io');
const path = require("path");

const PORT = 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let io;
// Routers
app.use("/api/products/", (req, res, next) => {
    req.socket = io;
    next();
}, productosRouter);
app.use("/", viewsRouter);
app.use("/carts", cartRouter);

const serverHTTP = app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});

io = new SocketServer(serverHTTP);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});