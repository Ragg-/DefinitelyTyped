// Type definitions for fluxible 1.4
// Project: https://fluxible.io/
// Definitions by: Ragg <https://github.com/Ragg->
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
import * as React from 'react';
import { Dispatcher, DispatcherError, Store } from 'dispatchr';
import { EventEmitter } from 'events';

declare class Fluxible {
    constructor(options?: Fluxible.FluxibleOption);
    createContext(options?: Fluxible.ContextOptions): Fluxible.FluxibleContext;
    registerStore(storeClass: Fluxible.StoreClass): void;
    plug(plugin: any): void;
    rehydrate(state: Fluxible.DehydratedState, callback?: (err: Error, context: Fluxible.FluxibleContext) => void): Promise<Fluxible.FluxibleContext>;
}

declare namespace Fluxible {
    export interface FluxibleOption {
        component?: { new(): React.Component<any, any> };
        componentActionErrorHandler?: (ctx: ComponentContext, payload: any, done: () => {}) => void;
        errorHandler?: (e: DispatcherError) => void;
    }

    export interface ContextOptions {
        app: Fluxible;
        optimizePromiseCallback?: boolean;
    }

    export interface DehydratedState {
        context?: {
            dispatcher: {
                stores?: {
                    [storeName: string]: any
                }
                options?: {
                    optimizePromiseCallback: boolean
                },
                plugins?: any
            },
            plugins?: any
        };
    }

    export interface StoreClass<S = {}> {
        new(dispacher: Dispatcher): Store<S>;
        storeName?: string;
        handlers?: { [actionName: string]: string };
    }

    export interface Action<P, R = any> {
        (actionContext: ActionContext, payload: P): Promise<R> | void;
        (actionContext: ActionContext, payload: P, done: () => void): void;
    }

    export interface FluxibleContext {
        executeAction<P, P2 extends P>(action: Action<P>, payload: P2): Promise<any>;
        executeAction<P, P2 extends P>(action: Action<P>, payload: P2, done: (err: Error, result: any) => {}): void;
        getStore<S extends Store = S>(store: string): S;
        getStore<S extends Store = S>(store: StoreClass<S>): S;
    }

    export interface ActionContext {
        dispatch<P>(name: string, payload: 　P): void;
        executeAction<P, P2 extends P>(action: Action<P>, payload: P2): Promise<any>;
        executeAction<P, P2 extends P>(action: Action<P>, payload: P2, done: (err: Error, result: any) => {}): void;
        getStore<S extends Store = S>(store: string): S;
        getStore<S extends Store = S>(store: StoreClass<S>): S;
    }

    export interface ComponentContext {
        executeAction<P, P2 extends P>(action: Action<P>, payload: P2): void;
        getStore<S extends Store = Store>(store: string): S;
        getStore<S extends Store>(store: StoreClass<any>): S;
    }

    export type StoreContext = object;
}

export = Fluxible
