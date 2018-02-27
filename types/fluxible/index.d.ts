/// <reference types="node" />

declare module 'fluxible' {
    import * as React from 'react';
    import { Dispatcher, DispatcherError } from 'dispatchr';
    import { EventEmitter } from 'events';

    class Fluxible {
        constructor(options?: Fluxible.FluxibleOption);
        createContext(options?: Fluxible.ContextOptions): Fluxible.FluxibleContext;
        registerStore(storeClass: Fluxible.StoreClass): void;
        plug(plugin: any): void;
        rehydrate(state: Fluxible.DehydratedState, callback?: (err: Error, context: Fluxible.FluxibleContext) => void): Promise<Fluxible.FluxibleContext>;
    }

    namespace Fluxible {
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
            handlers?: { [actionName: string]: string};
        }

        export interface Store<S = {}> extends EventEmitter {
            dehydrate?(): S;
            rehydrate?(state: S): void;
            shouldDehydrate?(): boolean;
        }

        export interface Action<P, R = any> {
            (actionContext: ActionContext, payload: P): Promise<R>|void;
            (actionContext: ActionContext, payload: P, done: () => void): void;
        }

        export interface FluxibleContext {
            executeAction<P, P2 extends P>(action: Action<P>, payload: P2): Promise<any>;
            executeAction<P, P2 extends P>(action: Action<P>, payload: P2, done: (err: Error, result: any) => {}): void;
            getStore<S extends Store = S>(store: string): S;
            getStore<S extends Store = S>(store: StoreClass<S>): S;
        }

        export interface ActionContext {
            dispatch<P>(name: string, payload:　P): void;
            executeAction<P, P2 extends P>(action: Action<P>, payload: P2): Promise<any>;
            executeAction<P, P2 extends P>(action: Action<P>, payload: P2, done: (err: Error, result: any) => {}): void;
            getStore<S extends Store = S>(store: string): S;
            getStore<S extends Store = S>(store: StoreClass<S>): S;
        }

        export interface ComponentContext {
            executeAction<P, P2 extends P>(action: Action<P>, payload: P2): void;
            getStore<S extends Store = S>(store: string): S;
            getStore<S extends Store = S>(store: StoreClass<S>): S;
        }

        export interface StoreContext {}
    }

    export = Fluxible
  }

declare module 'fluxible/utils' {
    import {
      Action,
      ActionContext,
      ComponentContext,
      Store,
      StoreClass
    } from 'fluxible';

    import { Dispatcher } from 'dispatchr';

    export interface MockActionContext extends ActionContext {
      rootId: number;
      dispacherContext: Dispatcher;
      executeActionCalls: { action: Action<any>, payload: any }[];
      dispatchCalls: { name: string, payload: any }[];
    }

    export interface MockComponentContext extends ComponentContext {
      executeActionCalls: { action: Action<any>, payload: any }[];
    }

    export function createMockActionContext(options: {
      stores: { new(...args: any[]): Store }[]
    }): MockActionContext

    export function createMockComponentContext(options: {
      stores: { new(...args: any[]): Store　}[]
    }): MockComponentContext
}

declare module 'fluxible/addons' {
    import {Store, StoreClass} from 'fluxible'

    interface StoreOption<T, S = {}> {
        storeName: string;
        handlers: {[eventName: string]: keyof T};
        initialize(this: T & Store): void;
        dehydrate(this: T & Store): S;
        rehydrate(this: T & Store, state: S): void;
    }

    export function createStore<State, T = {[key: string]: any}>(storeOption: StoreOption<T, State> & T): StoreClass<any>;
}

declare module 'fluxible/addons/BaseStore' {
    import * as BaseStore from 'dispatchr/addons/BaseStore';
    export = BaseStore;
}
