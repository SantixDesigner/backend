import { cart } from '../carrito.js'

export async function controllerPostCart(req, res) {
    try {
        if (req.body.title && req.body.price && req.body.thumbnail && req.signedCookies.email && req.signedCookies.password) {
            await cart.getAll();
            await cart.saveCart(req.body.title, req.body.price, req.body.thumbnail, req.signedCookies.email, req.signedCookies.password)
            res.json({ message: "carro enviado con exito" })
        }
        else {
            throw new Error("No hay nada")
        }
    }
    catch (err) {
        console.log(err);
    }
}

export async function controllerDeleteCart(req, res) {
    try {
        await cart.getAll();
        await cart.deleteById(req.signedCookies.email, req.signedCookies.password, req.params.id, req.params.idUsers, req.params.idSet)
    } catch (err) {
        console.log(err);
    }
}
export async function controllerGetCarts(req, res) {
    try {
        const carrito = await cart.getAll(req.signedCookies.email, req.signedCookies.password);
        if (carrito.length > 0) {
            const long = true
            const user = req.signedCookies.user;
            const pass = req.signedCookies.pass
            res.render('carrito', { carrito, long, user, pass })
        }
        else {
            res.json({ message: "no hay carro" })
        }
    } catch (err) {
        console.log(err);
    }
}
