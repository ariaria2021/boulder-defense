type Listener = (data?: any) => void;

export class EventBus {
    private listeners: Record<string, Listener[]> = {};

    on(event: string, callback: Listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data?: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    off(event: string, callback: Listener) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(l => l !== callback);
        }
    }
}

export const eventBus = new EventBus();
