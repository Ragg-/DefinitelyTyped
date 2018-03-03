import { Action, Dispatcher, Store, StoreClasss } from 'dispatchr'
import { ActionContext, ComponentContext　} from '../index'

export function createMockComponentContext(options: {
    stores: { new(...args: any[]): Store 　}[]
}): MockComponentContext
