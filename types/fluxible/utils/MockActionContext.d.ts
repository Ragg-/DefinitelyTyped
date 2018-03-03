import { Dispatcher } from 'dispatchr'
import { ActionCreator, ActionContext } from '../'

interface ActionCall {
    action: ActionCreator
    payload: any
}

interface DispatchCall {
    name: string
    payload: any
}

declare class MockActionContext implements ActionContext {
    dispatch: ActionContext['dispatch']
    executeAction: ActionContext['executeAction']
    getStore: ActionContext['getStore']

    rootId: number
    dispacherContext: Dispatcher
    executeActionCalls: ActionCall[]
    dispatchCalls: DispatchCall[]
}

export = MockActionContext
