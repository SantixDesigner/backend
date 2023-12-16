import cluster from "cluster";
import { cpus } from "os";
import Servidor from "./servidor.js";
import dotenv from 'dotenv'
dotenv.config()
if (process.env?.MODO === "cluster") {
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }
    cluster.on("exit", worker => {
        console.log(`${worker.process.pid}`)
    })
    const servidor = new Servidor()
    servidor.conectar({ puerto: 8080 })
}
else {
    const servidor = new Servidor()
    servidor.conectar({ puerto: 8080 })
}