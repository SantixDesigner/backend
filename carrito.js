
import { queryCarrito } from './config/firebase.js';
import { client } from './mainConnect.js'
class Cart {
    cart
    id
    idUser
    idSet
    constructor(base, collection) {
        this.db = client.db(base).collection(collection)
        this.cart = []
    }
    async getAll(user, pass) {
        try {
            return (await this.db.find().toArray()).filter(item => item.user == user && item.pass == pass)
        }
        catch (err) {
            console.log(err)
        }
    }
    async saveCart(title, price, thumbnail, user, pass, idChange = false, newCart = false) {
        await this.getAll(user, pass)
        try {
            const object = { title: title, price: Number(price), thumbnail: thumbnail, user: user, pass: pass }
            if (this.cart.length == 0) {
                this.idSet = 1
                this.id = 1
                this.idUser = 1
                object.id = this.id
                object.idSet = this.idSet
                object.idUsers = this.idUser
                this.cart.push(object)
            }
            else {
                this.id = this.cart[this.cart.length - 1].id + 1
                object.id = this.id
                this.idSet++
                object.idSet = this.idSet
                this.cart.map(item => {
                    if (item.user === user && item.pass === pass) {
                        this.idUser = item.idUsers + 1
                    }
                    else {
                        this.idUser = 1
                    }
                })
                object.idUsers = this.idUser
                this.cart.push(object)
            }
            await this.db.insertOne(object)

            const doc = queryCarrito.doc(`${this.id}`)
            doc.create({ title: object.title, id: object.id, price: object.price, thumbnail: object.thumbnail, idUser: this.idUser, idSet: this.idSet, user: user, pass: pass })

            return object
        } catch (err) {
            console.log(err)
        }
    }
    async getById(id, user, pass) {
        await this.getAll()
        const item = this.cart.find(item => item.id == id && item.user == user && item.pass == pass)
        return item
    }
    async deleteById(user, pass, id, idUser, idSet) {
        const doc = queryCarrito.doc(`${Number(idSet)}`)
        await doc.delete({ user: user, pass: pass, id: id, idUser: idUser, idSet: idSet })
        return await this.db.findOneAndDelete({ user: user, pass: pass, id: Number(id), idUsers: Number(idUser), idSet: Number(idSet) })
    }
}

export const cart = new Cart('productos', 'carrito')
