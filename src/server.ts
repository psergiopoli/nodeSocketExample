import * as net from 'net';

export class Server {
    
    private port: number;
    private address: string;
    private server: net.Server
    
    constructor(port: number, address: string) {
        this.port = port;
        this.address = address;
    }

    public start() {
        const server = net.createServer(this.handlerResponse);
        server.listen(this.port, this.address);
    }

    protected handlerResponse (socket: net.Socket) {
        console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
        socket.on('data', (data) => {
            const message = data.toString().replace(/[\n\r]*$/, ''); //quando aperta enter para enviar, envia também o enter
            
            if (message === 'exit') {
                socket.destroy();
            }
    
            // socket.write(OUTPUT_HEADERS + OUTPUT.length + OUTPUT_END_OF_HEADERS + OUTPUT);
            socket.write('Ola Mundo!');
            
        });
    };
}