import CryptoJS from "crypto-js";

function criptPass(pass){
    const passEncript = CryptoJS.SHA256(pass)

    return passEncript.toString(CryptoJS.enc.Hex)
}

const Pass = "niceWork"

const encrip = criptPass(Pass)

console.log("contraseña: ",encrip)