import admin from 'firebase-admin'
import serviceAccount from '../db/backend-88b5a-firebase-adminsdk-dmp75-0f1ef3601c.json' assert{
    type: 'json'
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
export const queryProductos = db.collection('productos')
export const queryCarrito = db.collection('carrito')
export const queryUsuarios = db.collection('users')