// Comando para establecer la conexión
let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado con el servidor');
});

// Escuchar
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});

// on 'estadoActual'

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});