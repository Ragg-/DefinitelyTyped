import Fluxible = require('./index');

const App = (props: object) => (<div {...props} />);

const fluxible = new Fluxible({
    component: App,
    componentActionErrorHandler: (ctx, payload, done) => {
        console.log();
    },
});
const context = fluxible.createContext({
    app: fluxible,
    optimizePromiseCallback: true,
});
