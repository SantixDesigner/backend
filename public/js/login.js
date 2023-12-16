const user = document.getElementById('user')
const pass = document.getElementById('pass')
document.getElementById('loginSuccess').addEventListener('click', (e) => {
    e.preventDefault()
    fetch(window.location, {
        method: "POST",
        body: JSON.stringify({user: user.value, pass: pass.value}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(data => {
        console.log(`Cargado con exito: `,data)
    }).catch(err => {
        console.log(err)
    }) 
})