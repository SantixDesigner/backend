

const socket = io()
const mensaje = document.getElementById('mensaje')
const nombre = document.getElementById('nombre')
const boton = document.getElementById('enviar')
socket.on("chatConectadoExitosoPorId", chats => {
    const chatFiltrado = chats.filter(item => item.id == mensaje.dataset.id)
    const mostrarMensaje = document.getElementById('mostrarMensajes')
    mostrarMensaje.innerHTML = ""
    chatFiltrado.map(item => {
        mostrarMensaje.innerHTML +=`<h3>${item.nombre}: </h3><h3>${item.mensaje}</h3>`
    })
})

boton.addEventListener('click', e => {
    const object = {
        mensaje: mensaje.value,
        nombre: nombre.value,
        id: mensaje.dataset.id
    }
    socket.emit("chatConectadoID", object)
})