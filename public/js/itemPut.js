const formPut = document.getElementById("formPut")

const submit = document.getElementById('actualizarProducto')
submit.addEventListener('click', e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    fetch(window.location, {
        body: JSON.stringify({ title: title, price: price, thumbnail: thumbnail }),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(data => {
            console.log(`Cargado con éxito: `, data);
        }).catch(err => {
            console.log(err)
        })
})