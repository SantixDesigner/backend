import express from 'express'
export let admin = false;
import { controllerPutProduct, controllerDeleteProduct, controllerGetAllProducts, controllerPostProducts, controllerGetProduct } from '../controllers/controllerPutProduct.js';

const RouterProductos = express()
async function onlyAdmin(req, res, next) {
    if (admin || req.signedCookies.adminLog) {
        admin = true
        await next()
    }
    else {
        next()
    }
}
export async function desloguearAdmin(){
    admin = false
}
async function estaLogueado(req, res, next) {
    if (req.signedCookies.email) {
        next()
    }
    else {
        res.render('logueate')
    }
}

const main = async () => {
    RouterProductos.get('/', (req, res) => {
        res.sendFile('index.html', { root: './views' })
    })
    RouterProductos.get('/api/productos/:id', estaLogueado, onlyAdmin, controllerGetProduct)
    RouterProductos.get('/api/productos/', estaLogueado, onlyAdmin, controllerGetAllProducts)
    RouterProductos.post('/api/productos/', estaLogueado, onlyAdmin, controllerPostProducts)
    RouterProductos.put('/api/productos/:id', estaLogueado, onlyAdmin, controllerPutProduct)
    RouterProductos.delete('/api/productos/:id', estaLogueado, onlyAdmin, controllerDeleteProduct)
}
main()
export default RouterProductos