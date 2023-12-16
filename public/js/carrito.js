const productoCarro = document.querySelectorAll('.productoCarro')
productoCarro.forEach(item => {
    item.addEventListener('click', e => {
        if(e.target.tagName == "BUTTON"){
            const array = e.target.id.split("-")
            console.log(array)
            const id = Number(array[1])
            const idUsers = Number(array[0])
            const idSet = Number(array[2])
            const windows = `${window.location.href}/${id}/${idUsers}/${idSet}`
            fetch(windows, {
                method: "DELETE"
            }).then(data => console.log(data))
            window.location.reload()
        }
    })
})