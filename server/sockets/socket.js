const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let nextTicket = ticketControl.siguiente();
        console.log(nextTicket);

        callback(nextTicket);
    });

    // Emitir un evento llamado 'estadoActual
    //{
    //  actual: ticketControl.getUltimoTicket()
    //}
    client.emit('estadoActual', { 
        actual: ticketControl.getUltimoTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'Escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFour()
        });
    });
});