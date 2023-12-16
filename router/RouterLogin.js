import express from 'express'
import { user } from '../usuarios.js';
import { admin, desloguearAdmin } from './RouterProductos.js';
const RouterLogin = express()
export let logueado = false;
async function controllerLogin(req, res) {
    try {
        res.render('login')
    }
    catch (err) {
        console.log(err)
    }
}
async function controllerPostLogin(req, res) {
    try {
        if (req.body?.user && req.body?.pass) {
            const userData = await user.gestionarContrasenia(req.body.user, req.body.pass)
            if (userData) {
                if(userData.email == "admin"){
                    res.cookie("adminLog",userData.email, {signed: true, maxAge: 1000*60*60})
                }
                res.cookie("email", userData.email, { signed: true, maxAge: 1000 * 60 * 60 })
                res.cookie("password",userData.pass, {signed: true, maxAge: 1000 * 60 * 60})
                logueado = true
                res.json({message: "hecho con exito"})
                
            }
            else {
                res.json({message: "no"})
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}
async function controllerRegister(req, res) {
    try {
        res.render('register')
    }
    catch (err) {
        console.log(err)
    }
}

async function yaEstabaLogueado(req, res, next) {
    if (!req.signedCookies.email && !req.signedCookies.pass) {
        next()
    }
    else {
        logueado = true
        res.json({ message: "ya estaba logueado." })
    }
}
async function controllerPostRegister(req, res, next) {
    if (req.body?.user && req.body?.pass) {
        await user.registrarUsuario(req.body.user, req.body.pass)
    }
}
async function controllerDelogout(req,res){
    res.cookie('email','',{signed: true, maxAge: 0})
    res.cookie('password','',{signed: true, maxAge: 0})
    res.cookie('adminLog','',{signed: true, maxAge: 0})
    logueado = false
    await desloguearAdmin()
    res.json({msg: "listo"})
}
const main = async () => {
    RouterLogin.get('/login', yaEstabaLogueado, controllerLogin)
    RouterLogin.post('/login', controllerPostLogin)
    RouterLogin.post('/register', controllerPostRegister)
    RouterLogin.get('/register', yaEstabaLogueado, controllerRegister)
    RouterLogin.get('/logout', controllerDelogout)
}
main()
export default RouterLogin