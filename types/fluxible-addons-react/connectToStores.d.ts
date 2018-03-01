import { ComponentContext } from 'fluxible'
import { StoreClass } from 'dispatchr'
import React = require('react')

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

// type ConnectedComponent<OwnProps, InjectedProps> = React.ComponentClass<Omit<OwnProps & InjectedProps, keyof InjectedProps>>
type ConnectedComponent<OwnProps, InjectedProps> = React.ComponentClass

type ConnectedComponentFactory<InjectedProps> = {
    <OwnProps>(
        component: React.ComponentClass<OwnProps>
    ): ConnectedComponent<OwnProps, InjectedProps>;
}

type GetStateFromStoresParam<Props, InjectedProps> = (context: ComponentContext, props: Props) => InjectedProps;

declare function connectToStores<OwnProps, InjectedProps = {}>(
    Component: React.ComponentClass<OwnProps>,
    stores: StoreClass[],
    getStateFromStores: GetStateFromStoresParam<OwnProps, InjectedProps>,
    customContextTypes?: object
): React.Component

declare function connectToStores<Props, InjectedProps = {}>(
    stores: StoreClass[],
    getStateFromStores: GetStateFromStoresParam<Props, InjectedProps>,
    customContextTypes?: object
): React.Component

export = connectToStores;

