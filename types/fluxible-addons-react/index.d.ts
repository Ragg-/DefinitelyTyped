declare module 'fluxible-addons-react/createElementWithContext' {
    import * as React from 'react'
    import {FluxibleContext} from 'fluxible'

    const _: <P = {}>(context: FluxibleContext) => React.ReactElement<P>
    export = _
  }

  declare module 'fluxible-addons-react/connectToStores' {
    import {Store, ComponentContext} from 'fluxible'
    import * as React from 'react'

    // Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
    type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
    type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

    interface StoreConstructor {
      new(...args: any[]): Store
    }

    type ComponentClass<P> = React.ComponentClass<P>

    interface ConnectedComponent<InjectedProps> {
      <OwnProps>(
        component: ComponentClass<OwnProps>
      ): ComponentClass<Omit<OwnProps & InjectedProps, keyof InjectedProps>>
    }

    interface DecoratorFactory {
      <Props, InjectedProps = {}>(
        stores: StoreConstructor[],
        getStateFromStores: (context: ComponentContext, props: Props) => InjectedProps
      ): ConnectedComponent<InjectedProps>
    }

    const _: DecoratorFactory
    export = _
  }
