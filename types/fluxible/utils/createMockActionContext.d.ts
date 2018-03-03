import { Store } from 'dispatchr';
import MockActionContext = require('./MockActionContext');

declare function createMockActionContext(options: {
    stores: { new(...args: any[]): Store }[]
}): MockActionContext;

export = createMockActionContext;
