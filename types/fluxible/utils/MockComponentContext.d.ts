import { DispatcherContext } from 'dispatchr'
import { ComponentContext, ActionCreator, StoreClass } from '../index'

interface ActionCall {
    action: ActionCreator<any>
    payload: any
}

declare class MockComponentContext implements ComponentContext {
    getStore: ComponentContext['getStore']
    executeAction: ComponentContext['executeAction']

    executeActionCalls: ActionCall[]
}

export = MockComponentContext
