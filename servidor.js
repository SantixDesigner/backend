import express from 'express'
import http from 'http'
import log4js from 'log4js'
import * as socket from 'socket.io'
import handlebars from 'express-handlebars'
import compression from 'compression'
import RouterProductos from './router/RouterProductos.js'
import RouterCarrito from './router/RouterCarrito.js'
import { RouterChat } from './router/RouterChat.js'
import cookieParser from 'cookie-parser'
import RouterLogin from './router/RouterLogin.js'
import { product } from './productos.js';
import { chat } from './chat.js';
import { chatConnect } from './chatConexion.js';
const PALABRA_SECRETA = "prueba";
const logger = log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } },
})

const logs = logger.getLogger('cheese')
export default class Servidor {
    #app
    constructor() {
        this.#app = express()
        this.httpServer = new http.Server(this.#app)
        this.io = new socket.Server(this.httpServer)
        this.#app.use(express.urlencoded({ extended: true }))
        this.#app.use(express.json())
        this.#app.use(compression())
        this.#app.use(express.static('public'))
        this.#app.use(cookieParser(PALABRA_SECRETA))
        this.#app.use(RouterProductos)
        this.#app.use(RouterChat)
        this.#app.use(RouterCarrito)
        this.#app.use(RouterLogin)
        this.#app.use(RouterProductos)
        this.io.on("connection", socket => {
            socket.on("updateProducts", object => {
                product.saveProduct(object.title, object.price, object.thumbnail);
            });
            socket.on("nuevoChat", nombre => {
                chat.guardarNuevoUsuario(nombre);
                this.io.sockets.emit("chatCreado", chat.array);
            });
            socket.emit("chatCreado", chat.array);
            socket.on("chatConectadoID", object => {
                chatConnect.guardarChat(object.nombre, object.mensaje, object.id);
                this.io.sockets.emit("chatConectadoExitosoPorId", chatConnect.array);
            });
            socket.emit("chatConectadoExitosoPorId", chatConnect.array);
        });

        this.#app.engine('hbs', handlebars.engine({ extname: 'hbs' }))
        this.#app.set('view engine', 'hbs')
    }
    conectar({ puerto = 0 }) {
        this.httpServer.listen(puerto, () => {
            console.log("Escuchando!")
        })
    }
    desconectar() {
        httpServer.close((err) => console.log(err))
    }
}