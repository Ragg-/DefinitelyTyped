import {
    Action,
    ActionContext,
    ComponentContext,
    Store,
    StoreClass
} from './';

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
    stores: { new(...args: any[]): Store 　}[]
}): MockComponentContext
