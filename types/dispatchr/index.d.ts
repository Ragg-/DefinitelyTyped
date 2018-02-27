/// <reference types="node" />

declare module 'dispatchr' {
    import { FluxibleContext, Store, StoreClass, StoreContext } from 'fluxible';

    export interface Action<T = any> {
        name: string;
        payload: T;
        waitFor(stores: string|string[]|StoreClass|StoreClass[], callback: () => void): void;
    }

    export interface Dispatcher {
        createContext(context: any): DispatcherContext;
        registerStore(store: StoreClass): void;
        isRegistered(store: StoreContext|string): boolean
        getStoreName(store: StoreClass|string): string;
    }

    export interface DispatcherInterface {
        getContext(): DispatcherContext;
        getStore: DispatcherContext['getStore'];
        waitFor: DispatcherContext['waitFor'];
    }

    export interface DispatcherContext {
        getStore(name: string): Store;
        getStore<T extends Store>(name: StoreClass<T>): T;
        dispatch(actionName: string, payload: object): void
        dehydrate(): DispatcherState;
        rehydrate(dispatcherState: DispatcherState): void;
        waitFor<T extends Store>(stores: string|string[], callback: () => void): void;
    }

    export interface DispatcherError {
        message: string;
        type: string;
        meta: {
            actionName?: string,
            payload?: any,
            error: Error
        };
    }

    interface DispatcherState {
        stores: {
            [storeName: string]: any
        }
    }

    interface DispatcherOption {
        stores?: StoreClass[]
        errorHandler?: (e: DispatcherError, context: DispatcherContext) => void
    }

    export function createDispatcher(options: DispatcherOption): Dispatcher;
}

declare module 'dispatchr/addons/BaseStore' {
    import { Dispatcher, DispatcherInterface, DispatcherContext } from 'dispatchr'
    import { Store } from 'fluxible'
    import { EventEmitter } from 'events'

    class BaseStore<S = {}> extends EventEmitter implements Store<S> {
        constructor(dispatcher: DispatcherInterface);
        initialize?: () => void;
        getContext(): DispatcherContext;
        addChangeListener(callback: () => void): void;
        removeChangeListener(callback: () => void): void;
        shouldDehydrate(): boolean;
        emitChange(): void;
    }

    export = BaseStore
}

