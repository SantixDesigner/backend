
import { queryProductos } from './config/firebase.js';
import {client}  from './mainConnect.js';
class Product {
    array;
    id
    constructor(base, collection) {
        this.array = []
        this.db = client.db(base).collection(collection)
    }
    async getInfo() {
        try {
            this.array = await this.db.find().toArray()
            return this.array

        }
        catch (err) {
            console.log(err)
        }
    }
    async saveProduct(title, price, thumbnail) {
        try {
            await this.getInfo()
            const objectProduct = {
                title: title,
                price: price,
                thumbnail: thumbnail
            }
            if(this.array.length == 0){
                this.id = 1
                objectProduct.id = this.id
            }
            else{
                this.id = this.array[this.array.length-1].id+1
                objectProduct.id = this.id
            }
            this.array.push(objectProduct)
            const doc = queryProductos.doc(`${this.id}`)
            await doc.create({title: title, price: price, thumbnail: thumbnail, id: this.id})
            return await this.db.insertOne(objectProduct)
        } catch (err) {
            console.log(err)
        }
    }
    async getById(id) {
        try {
            await this.getInfo()
            const returnItem = await this.db.findOne({id: id})
            return returnItem
        }
        catch (err) {
            console.log(err)
        }
    }
    async deleteById(id) {
        try {
            await this.getInfo()
            const itemToDelete = this.array.findIndex(item => item.id === id)
            const object = this.array[itemToDelete]
            this.array.splice(itemToDelete, 1)
            await this.db.deleteOne({id: id})
            const doc = queryProductos.doc(`${id}`)
            await doc.delete()
            return object, await this.db.find().toArray()
        }
        catch (err) {
            console.log(err)
        }
    }
    async getAll() {
        try {
            await this.getInfo()
            return this.array

        } catch (err) {
            console.log(err)
        }
    }
    async deleteAll() {
        try {
            await this.getInfo()
            this.array.splice(0, this.array.length)
            await this.db.deleteMany({})
            for (let i = 1; i<=this.id; i++){
                const doc = queryProductos.doc(`${i}`)
                await doc.delete()
            }
        } catch (err) {
            console.log(err)
        }
    }
    async modifById(title, price, thumbnail, id) {
        try {
            await this.getInfo()
            const doc = queryProductos.doc(`${id}`)
            await doc.update({title: title, price: price, thumbnail: thumbnail})
            const encontrado = await this.db.updateOne({id: id}, {$set: {title: title, price: price, thumbnail: thumbnail}})
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const product = new Product('productos', 'productos')
const main = async () => {
    await product.getInfo()
}
main()