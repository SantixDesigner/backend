const socket = io()
socket.on("chatCreado", chats => {
    const chat = document.getElementById('chat')
    chat.innerHTML = ''
    chats.map(item => {
        chat.innerHTML += `
        <div>
            <button id="chat-${item.id}">${item.name}</button>
        </div>`
    })
})
console.log(socket)

const precio = document.getElementById("precio")
const titulo = document.getElementById('titulo')
const imagen = document.getElementById('imagen')
const enviar = document.getElementById('enviarLog')
if (enviar) {
    enviar.addEventListener("click", e => {
        e.preventDefault()
        if (Number(precio.value) && titulo.value && imagen.value) {
            const object = {
                title: titulo.value,
                price: precio.value,
                thumbnail: imagen.value
            }
            socket.emit("updateProducts", object);
        }
    })
}

const tarjetas = document.querySelectorAll('.tarjetaProducto')
tarjetas.forEach(item => {
    const windows = `http://localhost:8080/api/productos/${item.lastElementChild.previousElementSibling.id}`


    console.log(item)
    item.addEventListener('click', e => {
        if (e.target.innerText == "Modificar") {
            window.location.href = windows
        }
        if (e.target.innerText == "Eliminar") {
            const id = Number(e.target.id.replace('a-', ''));
            console.log(id)
            fetch(windows, {
                method: "DELETE"
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (e.target.innerText == "Comprar") {
            const id = e.target.id.replace('e-', '')
            const title = document.getElementById(`b-${id}`)
            const price = document.getElementById(`c-${id}`)
            const thumbnail = document.getElementById(`d-${id}`)
            const windowCarrito = `http://localhost:8080/api/carrito/`
            fetch(windowCarrito, {
                method: "POST",
                body: JSON.stringify({ title: title.dataset.title, price: price.dataset.price, thumbnail: thumbnail.dataset.thumbnail }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(data => console.log(`Mensaje completo `, data))
                .catch(err => console.log(err))
        }
    })
})

const crearNuevoChat = document.getElementById('crearNuevoChat')

crearNuevoChat.addEventListener('click', e => {
    const user = document.getElementById('user').value
    socket.emit('nuevoChat', user)
})

const chats = document.getElementById('chat')

chats.addEventListener('click', e => {
    if (e.target.tagName == "BUTTON"){
        console.log("hola")
        const guiaId = e.target.id.replace('chat-','')
        window.location = `${window.location.href}/chat/${guiaId}`
    }
})