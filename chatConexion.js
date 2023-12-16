class ChatConexion{
    array
    constructor(){
        this.array = []
    }
    guardarChat(nombre, mensaje, id){
        this.array.push({nombre: nombre, mensaje: mensaje, id: id})
    }
    estamosEnChat(id){
        const filtrado = this.array.filter(item => item.id == id)
        return filtrado
    }
}

export const chatConnect = new ChatConexion()