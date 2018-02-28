import Fluxible = require('./index');

const App = (props: object) => <div {...props} />;

const fluxible = new Fluxible();
const context = fluxible.createContext({
    app: App
});
