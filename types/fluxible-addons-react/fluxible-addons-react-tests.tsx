import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as Fluxible from 'fluxible';
import BaseStore = require('fluxible/addons/BaseStore');
import { createElementWithContext } from './index';
import connectToStores = require('./connectToStores');
import { ComponentContext, ActionCreator } from '../fluxible';

// Action
const someAction: ActionCreator<{ say: string }> = async (ctx, payload) => {
    await ctx.executeAction(subAction, {});
    ctx.dispatch('ACTION', {});
};

const subAction: ActionCreator = async (ctx) => {
    ctx.dispatch('SUB_ACTION', {});
};

// Component
class App extends React.Component<{ label: string, amount: number }> {
    context: ComponentContext;

    componentDidMount() {
        this.context.executeAction(someAction, { say: 'meow' });
    }
}

// Store
class TestStore extends BaseStore {
    getText(): string { return 'meow'; }
}

const app = new Fluxible();
const context = app.createContext();

const ConnectedWithComponent = connectToStores(App, [TestStore], (context) => ({
    label: 'string'
}));

const ConnectedWithDecorator = connectToStores([TestStore], (context) => ({
    label: context.getStore(TestStore).getText()
}))(App);

// Expect no error without `text` prop
<ConnectedWithComponent amount={1} />;
<ConnectedWithDecorator amount={1} />;

ReactDOM.renderToString(
    createElementWithContext(context, { test: 'text' })
);
