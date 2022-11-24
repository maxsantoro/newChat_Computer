// 01 Establecemos comunicaion del lado del Cliente
const socket = io.connect()

// 03 armamos la funcion render
function render(data) {
    const html = data.map(item => {
        return (`<div> <strong>${item.author}</strong>: <em>${item.text}</em></div>`)
    }).join(' ')

    document.getElementById('message').innerHTML = html
}
function alertMsj(data){
    document.getElementById("nameMsj").innerHTML = 


}




// 04 -Funcion que se ejecuta cuando doy click al boton de enviar

function addMessage(){
    const authorName = document.getElementById("author").value 
    const textMessage = document.getElementById("text").value 

    const mensaje = {
        author: authorName ,
        text: textMessage
    }
    document.getElementById('text').value = ''
    //enviamos la data al server

    socket.emit("new-message", mensaje)
    return false
}


// 02 Definimos elementos para enviar(emit) y recibir (on ) mensajes.
socket.on("message",data =>{
    render(data)
    alertMsj(data)
})//primer parametro es el nombre del mensaje y el segundo es una funcion callback q renderiza la data q nos traemos