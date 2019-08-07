
import { Server } from './server';
import * as net from 'net';

export class WebServer extends Server {

    private static OUTPUT = "<html><head><title>Example</title></head><body><p>Worked!!! x)</p></body></html>";
    private static OUTPUT_HEADERS = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: ";
    private static OUTPUT_END_OF_HEADERS = "\r\n\r\n";

    constructor(port: number, address: string) {
        super(port, address);
    }

    protected handlerResponse(socket: net.Socket) {
        console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
        socket.on('data', (data) => {
            const message = data.toString().replace(/[\n\r]*$/, '');
            
            if (message === 'exit') {
                socket.destroy();
            }
    
            socket.write(WebServer.OUTPUT_HEADERS + WebServer.OUTPUT.length + WebServer.OUTPUT_END_OF_HEADERS + WebServer.OUTPUT);            
        });
    }
}
