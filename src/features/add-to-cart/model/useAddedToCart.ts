import { shallowRef } from "vue";

export const useAddedToCart = () => {
    const connected = shallowRef<boolean>(false);

    const handleAddToCart = () => {
        const socket = new WebSocket("wss://echo.websocket.org");

        socket.onopen = () => {
            connected.value = true;
            console.warn("Opened");
        };
        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(String(event.data));
                console.warn(message);
            } catch {
                console.warn("Non-JSON message:", event.data);
            }
        };
        socket.onclose = () => {
            console.warn("Closed");
            connected.value = false;
        };
        socket.onerror = () => {
            console.error("Error");
        };
    };

    return {
        handleAddToCart,
        connected
    };
};
