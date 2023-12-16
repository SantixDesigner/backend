import { product } from '../productos.js'
import fs, { truncateSync } from 'fs'
import { admin } from '../router/RouterProductos.js';
export async function controllerPutProduct(req, res) {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        try {
            const encontrado = await product.modifById(req.body.title, Number(req.body.price), req.body.thumbnail, Number(req.params.id))
            if (encontrado == 1) {
                const findIndex = product.array.findIndex(item => item.id == req.params.id)
                product.array[findIndex] = req.body
                product.array[findIndex].id = Number(req.params.id)
            } else {
                res.json({ message: "don't found" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        res.status(503);
        res.json({ message: "YOU FORGOT SOME INFO" });
    }
}
export async function controllerDeleteProduct(req, res) {
    const id = Number(req.params.id);
    if (id) {
        product.deleteById(id)
    }
    else {
        res.status(404);
        res.json({ message: "Object doesn't found it." });
    }
}
export async function controllerPostProducts(req, res) {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        await product.saveProduct(req.body.title, req.body.price, req.body.thumbnail)
        res.json({ message: `Nice work. You added completely ${product.array.length} items` })
    }
    else {
        res.status(503)
        res.json({ message: "You fall. There's not a information that we need." })
    }
}

export async function controllerGetProduct(req, res) {
    try {
        if (admin) {
            const id = req.params.id
            const item = product.getById(Number(id))
            if (item == undefined) {
                res.status(404)
                res.json({ message: "NOT FOUND" })
            }
            else {
                const modif = true
                res.render("itemBuscado", { item, modif })
            }
        }
        else {
            res.json({ message: "You aren't an admin" })
        }
    }
    catch (err) {
        console.log(err)
    }
}

export async function controllerGetAllProducts(req, res) {
    try {
        let arrayIntegro = true
        const array = await product.getAll()
        res.render("productos", { array, arrayIntegro, admin })
    }
    catch (err) {
        console.log(err)
    }
}
