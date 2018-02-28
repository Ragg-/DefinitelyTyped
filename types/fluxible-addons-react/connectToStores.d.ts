import {Store, ComponentContext} from 'fluxible'
import * as React from 'react'

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

interface StoreConstructor {
    new(...args: any[]): Store
}

type ConnectedComponent<OwnProps, InjectedProps> = React.ComponentClass<Omit<OwnProps & InjectedProps, keyof InjectedProps>>

type ConnectedComponentFactory<InjectedProps> = {
    <OwnProps>(
        component: React.ComponentClass<OwnProps>
    ): ConnectedComponent<OwnProps, InjectedProps>;
}

type GetStateFromStoresParam<Props, InjectedProps> = (context: ComponentContext, props: Props) => InjectedProps;

declare function connectToStores<OwnProps, InjectedProps = {}>(
    Component: React.ComponentClass<OwnProps>,
    stores: StoreConstructor[],
    getStateFromStores: GetStateFromStoresParam<OwnProps, InjectedProps>,
    customContextTypes?: object
): ConnectedComponent<OwnProps, InjectedProps>;

declare function connectToStores<Props, InjectedProps = {}>(
    stores: StoreConstructor[],
    getStateFromStores: GetStateFromStoresParam<Props, InjectedProps>,
    customContextTypes?: object
): ConnectedComponentFactory<InjectedProps>;

export = connectToStores

