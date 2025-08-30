import { encode, decode } from '@msgpack/msgpack';
type MessageHandler = (data: any) => void


class WebSocketManager {

    private socket: WebSocket | null = null;
    private messageHandlers: MessageHandler[] = []
    private url: string = ""



    constructor(url: string) {
        this.url = url
    }

    connect() {
        this.socket = new WebSocket(this.url)

        this.socket.onopen = () => {
            console.log("Websocket enhancement manager created!")
        }

        this.socket.onmessage = async (event) => {
            try {
                // 二进制解析
                if (event.data instanceof Blob) {
                    const arrayBuffer = await event.data.arrayBuffer();
                    const decoded = decode(new Uint8Array(arrayBuffer));
                    this.messageHandlers.forEach(handler => handler(decoded))

                } else if (event.data instanceof ArrayBuffer) {
                    const decoded = decode(new Uint8Array(event.data));
                    this.messageHandlers.forEach(handler => handler(decoded))
                }

            } catch (error) {
                console.error("Error parsing message", error)
            }
        }

        this.socket.onclose = (event) => {
            console.log('WebSocket disconnected', event);
            if (event.code === 1006 || event.code === 4006) {
                let data = {
                    "event": "reconnecting",
                    "data": `ws连接断开`
                }
                this.messageHandlers.forEach(handler => handler(data))
                console.log("服务端：", event.code, "；尝试重连")
            }
            else if (event.code === 1002) {
                let data = {
                    "event": "connect_error",
                    "data": `服务器连接异常，请稍后重试`
                }
                this.messageHandlers.forEach(handler => handler(data))
            }

        }

        this.socket.onerror = (error) => {
            console.log('WebSocket miss error:', error);
            let data = {
                "event": "connect_error",
                "data": `连接异常， 请刷新页面`
            }
            this.messageHandlers.forEach(handler => handler(data))
        }
    }


    send(message: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            // 二进制传输
            this.socket.send(encode(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    subscribe(handler: MessageHandler) {
        this.messageHandlers.push(handler)
    }
    close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default WebSocketManager;