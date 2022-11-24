//Server
const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io") //Renombramos el server , en el caso de io ponemos io server y de http le asignamos httpServer
const app = express()
const httpServer = new  HttpServer(app)
const io = new IOServer(httpServer)

//middleware

app.use(express.static("./public"))
const PORT = process.env.PORT | 8080

const messages = [
    {author: "Pablo", text: "Hola,que tal?"},
    {author: "Marcelo", text: "Muy bien y vos?"},
    {author: "Belen", text: "Hola!!"}
]


//implementacion/configuracion de socket 
io.on("connection",socket=>{
    console.log("nuevo cliente conectado!!")
    //vamos a enviar el historial del chat cuando un nuevo cliente
    //se conecta

    socket.emit("message",messages)
    //escuchamos al cliente

    socket.on("new-message",data=>{
        messages.push(data)

        //re enviamos por medio de broadcast y 
        //replicamos los mensajes a todos los clientes que esten conectados en ese momento

        io.sockets.emit("message", messages)
    })

})

httpServer.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})