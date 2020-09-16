const subscriptions = {};

export default {
  emit(eventType: string, args: any) {
    if (!subscriptions[eventType]) return;

    Object.getOwnPropertySymbols(subscriptions[eventType]).forEach(
      (idSymbol) => {
        subscriptions[eventType][idSymbol](args);
      }
    );
  },
  addEventListener(
    eventType: string,
    callback: (args: any) => void
  ): { unsubscribe: () => void } {
    const idSymbol = Symbol("subscription");

    if (!subscriptions[eventType]) subscriptions[eventType] = {};

    subscriptions[eventType][idSymbol] = callback;

    return {
      unsubscribe: () => {
        delete subscriptions[eventType][idSymbol];
        if (Object.keys(subscriptions[eventType]).length === 0)
          delete subscriptions[eventType];
      },
    };
  },
};
