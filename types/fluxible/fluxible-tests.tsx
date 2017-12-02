import * as React from 'react';
import * as connectToStores from 'fluxible/utils'
import * as Fluxible from 'fluxible';
import * as BaseStore from 'fluxible/addons/BaseStore'

class AppComponent extends React.Component {
    render(): null { return null; }
}

class AppStore extends BaseStore {
    storeName: 'AppStore';

    handlers: {
        'ACTION': 'actionHandler',
    };

    actionHandler: () => {};
}

const app = new Fluxible({
    component: AppComponent,
});

app.registerStore(AppStore);
