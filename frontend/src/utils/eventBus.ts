class EventBus {
  private readonly events: {
    [prop: string]: { fn: Function; once: boolean }[];
  };
  constructor() {
    this.events = {};
  }

  on(eventName: string | number, fn: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push({ fn, once: false });
  }

  once(eventName: string | number, fn: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push({ fn, once: true });
  }

  off(eventName: string | number, fn: Function) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i].fn === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  emit(eventName: string | number, data?: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function ({ fn, once }) {
        fn(data);
        // if(once) {
        // }
      });
      this.events[eventName] = this.events[eventName].filter(
        (fnObj) => !fnObj.once
      );
    }
  }
}

export const eventBus = new EventBus();

export enum EventsEnum {
  limitReach,
}
