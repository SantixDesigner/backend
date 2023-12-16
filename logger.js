import fs from 'fs'
class Logger {
    static nivel = 0
    static info = 1
    static debug = 5
    static warning = 8
    static error = 10
    static log(nivel, mensaje) {
        if (nivel >= Logger.nivel) {
            console.log(`${new Date().toISOString()}: ${mensaje}`)
            fs.appendFile('./data.log', `${new Date().toISOString()}: ${mensaje}`, () => {
                console.log("exito")
            })
        }
    }
}
Logger.nivel = 5

Logger.log(Logger.error, "kjasdkjadjsk")