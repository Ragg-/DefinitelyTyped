import Fluxible = require('./index');
import createStore = require('./addons/createStore');
import createMockComponentContext = require('./utils/createMockComponentContext')
import createMockActionContext = require('./utils/createMockActionContext')

const App = (props: object) => (<div {...props} />);

// Store
const Store = createStore({
    handlers: {
        'SOME_ACTION': handleSomeAction,
    },
    storeName: 'Store',

    handleSomeAction() {

    }
});

// Action
interface Actions {
    'SOME_ACTION': { say: string }
};
const someAction: Fluxible.ActionCreator = (context, payload) => {
    context.dispatch<Actions>('SOME_ACTION', {  })
};

// App
const app = new Fluxible({
    component: App,
    componentActionErrorHandler: (ctx, payload, done) => {
        console.log();
    },
});

app.registerStore(Store);

const context = app.createContext({
    app,
    optimizePromiseCallback: true,
});

// in tests
const mockComponentContext = createMockComponentContext({
    stores: [ Store ],
});

const mockActionContext = createMockActionContext({
    stores: [ Store ],
});
