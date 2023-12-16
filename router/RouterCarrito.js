import express from 'express'
import  {controllerPostCart, controllerGetCarts, controllerDeleteCart} from '../controllers/controllerPostCart.js'
const RouterCarrito = express()
const main = async () => {
    RouterCarrito.post('/api/carrito/', controllerPostCart)
    RouterCarrito.get('/api/carrito/',controllerGetCarts)
    RouterCarrito.delete('/api/carrito/:id/:idUsers/:idSet', controllerDeleteCart)
}
main()
export default RouterCarrito