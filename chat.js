class Chat{
    array;
    constructor(){
        this.id = 1 
        this.array = []   
    }
    async guardarNuevoUsuario(nombre){
        if(this.array.length == 0){
            this.array.push({name: nombre, id: this.id})
        }
        else{
            this.id++
            this.array.push({name: nombre, id: this.id})
        }
    }
    async eliminarPorId(id){
        const index = this.array.findIndex(item => item.id == id)
        this.array.splice(index, 1)
    }
}

export const chat = new Chat()