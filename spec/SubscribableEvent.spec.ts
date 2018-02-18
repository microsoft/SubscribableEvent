import SubscribableEvent, { SubscriptionToken } from '../src/SubscribableEvent';

const PAYLAOD = 'payload';

describe('SubscribableEvent', () => {
    it('calls all subscribers on fire', () => {
        const subscribableEvent = new SubscribableEvent<(payload: string) => void>();
        const subscriber = jasmine.createSpy('subscriber', (payload: string) => {}).and.callThrough();

        subscribableEvent.subscribe(subscriber);
        subscribableEvent.subscribe(subscriber);
        subscribableEvent.subscribe(subscriber);
        subscribableEvent.fire(PAYLAOD);

        expect(subscriber).toHaveBeenCalledWith(PAYLAOD);
        expect(subscriber).toHaveBeenCalledTimes(3);
    });

    it('calls subscribers in reverse order', () => {
        const subscribableEvent = new SubscribableEvent<(payload: string) => void>();
        const callback = (payload: string) => {};
        const subscriber1 = jasmine.createSpy('subscriber1', callback).and.callThrough();
        const subscriber2 = jasmine.createSpy('subscriber2', callback).and.callThrough();

        subscribableEvent.subscribe(subscriber1);
        subscribableEvent.subscribe(subscriber2);
        subscribableEvent.fire(PAYLAOD);

        expect(subscriber2).toHaveBeenCalledBefore(subscriber1);
    });

    it('unsubscribes listener from an event', () => {
        const subscribableEvent = new SubscribableEvent<(payload: string) => void>();
        const callback = (payload: string) => {};
        const subscriber1 = jasmine.createSpy('subscriber1', callback).and.callThrough();
        const subscriber2 = jasmine.createSpy('subscriber2', callback).and.callThrough();

        subscribableEvent.subscribe(subscriber1);
        subscribableEvent.subscribe(subscriber2).unsubscribe();
        subscribableEvent.fire(PAYLAOD);

        expect(subscriber1).toHaveBeenCalledWith(PAYLAOD);
        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber2).toHaveBeenCalledTimes(0);
    });

    it('unsubscribes all listeners from an event', () => {
        const subscribableEvent = new SubscribableEvent<(payload: string) => void>();
        const subscriber = jasmine.createSpy('subscriber', (payload: string) => {}).and.callThrough();

        subscribableEvent.subscribe(subscriber);
        subscribableEvent.subscribe(subscriber);

        subscribableEvent.dispose();
        subscribableEvent.fire(PAYLAOD);

        expect(subscriber).toHaveBeenCalledTimes(0);
    });

    it('stops event propagation if one of a subscribers return a truthy response', () => {
        const subscribableEvent = new SubscribableEvent<(payload: string) => boolean>(true);
        const subscriber = jasmine.createSpy('subscriber', (payload: string) => true).and.callThrough();

        subscribableEvent.subscribe(subscriber);
        subscribableEvent.subscribe(subscriber);

        expect(subscribableEvent.fire(PAYLAOD)).toEqual(true);
        expect(subscriber).toHaveBeenCalledWith(PAYLAOD);
        expect(subscriber).toHaveBeenCalledTimes(1);
    });
});
