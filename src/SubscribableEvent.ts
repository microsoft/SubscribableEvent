/**
 * SubscribableEvent.ts
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * A simple strongly-typed pub/sub/fire eventing system.
 */

export class SubscriptionToken {
    constructor(private _event: SubscribableEvent<any>,
        private _callback: (...args: any[]) => boolean|void) {
    }

    unsubscribe() {
        this._event.unsubscribe(this._callback);
    }
}

export default class SubscribableEvent<F extends { (...args: any[]): boolean|void }> {
    private _subscribers: ReadonlyArray<Function>;

    // By default, SubscribableEvent will fire to all subscribers regardless of any conditions.
    // If you enable allowStopPropagation, then a subscription callback can return a truthy response and it will halt further callbacks.
    constructor(private _allowStopPropagation = false) {
        this._subscribers = [];
    }

    dispose() {
        this._subscribers = [];
    }

    subscribe(callback: F): SubscriptionToken {
        this._subscribers = this._subscribers.concat(callback);

        return new SubscriptionToken(this, callback);
    }

    unsubscribe(callback: F) {
        this._subscribers = this._subscribers.filter(value => value !== callback);
    }

    fire: F = <any> ((...args: any[]) => {
        // Keep reference to the original readonly array. We don't want to have it change while we're firing
        const subs = this._subscribers;

        // Execute handlers in the reverse order in which they were registered.
        for (let i = subs.length - 1; i >= 0; i--) {
            const ret = subs[i].apply(null, args);
            if (this._allowStopPropagation && !!ret) {
                // If the value was handled, early out.
                return true;
            }
        }

        return false;
    });
}
