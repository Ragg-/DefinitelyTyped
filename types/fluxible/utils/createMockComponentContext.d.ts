import { StoreClass } from 'dispatchr'
import MockComponentContext = require('./MockComponentContext')

declare function createMockComponentContext(options: {
    stores: StoreClass[]
}): MockComponentContext

export = createMockComponentContext
