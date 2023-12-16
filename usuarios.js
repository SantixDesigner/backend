import CryptoJS from "crypto-js"
import { client } from "./mainConnect.js"
import { queryUsuarios } from "./config/firebase.js"
class Usuario {
    constructor(base, coleccion) {
        this.id = 1
        this.array = {}
        this.db = client.db(base).collection(coleccion)
    }
    async registrarUsuario(email, pass) {
        await this.obtenerTodosLosUsuarios()
        this.email = email
        this.pass = await this.registrarCrypto(pass)
        if (await this.db.findOne({ pass: this.pass, email: this.email }) == null) {
            this.array.push({ email: this.email, pass: this.pass, id: this.id })
            this.db.insertOne({ email: this.email, pass: this.pass, id: this.id })
            const doc = queryUsuarios.doc(`${this.id}`)
            doc.create({ email: this.email, pass: this.pass, id: this.id })
            this.id++
            return false
        }
        else{
            return true
        }
    }
    async registrarCrypto(pass) {
        const password = CryptoJS.SHA256(pass)
        return password.toString(CryptoJS.enc.Hex)
    }
    async obtenerTodosLosUsuarios() {
        this.array = await this.db.find().toArray()
        if (this.array.length > 0) {
            this.id = this.array[this.array.length - 1].id + 1
        }
        return this.array
    }
    async gestionarContrasenia(email, pass) {
        this.pass = await this.registrarCrypto(pass)
        this.email = email
        return this.db.findOne({ pass: this.pass, email: this.email })
    }
}
export const user = new Usuario("productos", "usuarios")
