const productoCarro = document.querySelectorAll('.productoCarro')
productoCarro.forEach(item => {
    item.addEventListener('click', e => {
        if(e.target.tagName == "BUTTON"){
            const array = e.target.id.split("-")
            console.log(array)
            const cart = Number(array[0])
            const prod = Number(array[1])
            const windows = `http://localhost:8080/api/carrito/${cart}/productos/${prod}`
            fetch(windows, {
                method: "DELETE"
            })
        }
    })
})

const enviarCarro = document.getElementById('enviarCarroId')

enviarCarro.addEventListener('click', e => {
    e.preventDefault()
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')

    fetch(window.location, {
        method:"POST",
        body: JSON.stringify({title: title.value, price: Number(price.value), thumbnail: thumbnail.value}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(data => console.log("envio con exito: ",data))
    .catch(err => console.log(err))
})