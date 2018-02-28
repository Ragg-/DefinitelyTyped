import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as Fluxible from 'fluxible';
import BaseStore = require('fluxible/addons/BaseStore');
import { createElementWithContext, connectToStores } from './index';

class App extends React.Component<{ test: string }> {}
class TestStore extends BaseStore {
    getText(): string { return 'meow'; }
}

const app = new Fluxible();
const context = app.createContext();

const ConnectedWithComponent = connectToStores(App, [TestStore], (context) => ({
    test: 'string'
}));

const ConnectedWithDecorator = connectToStores([TestStore], (context) => {
    test: context.getStore(TestStore).getText(),;
});

ReactDOM.renderToString(
    createElementWithContext(context, ConnectedWithComponent)
);
