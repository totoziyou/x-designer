
export class EventBus {

    constructor() {
        this._init();
    }

    _init() {
        this.events = {}
    }

    on = (eventName, eventHandler) => {
        if(!this.events[eventName]) {
            this.events[eventName] = []
        }
        const idx = this.events[eventName].findIndex(handler => handler === eventHandler);
        if(idx === -1) {
            this.events[eventName].push(eventHandler);
        }
    }

    off = (eventName, eventHandler) => {
        if(!this.events[eventName]) return;
        const idx = this.events[eventName].findIndex(handler => handler === eventHandler);
        if(idx > -1) {
            this.events[eventName].splice(idx, 1);
        }
    }

    emit = (eventName, params) => {
        if(!this.events[eventName]) {
            // console.warn(`eventName:${eventName} 不存在`);
            return;
        }
        this.events[eventName].forEach(handler => {
            handler(params);
        });
    }
}