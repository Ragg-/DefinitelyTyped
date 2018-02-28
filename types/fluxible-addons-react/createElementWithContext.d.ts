import * as React from 'react';
import { FluxibleContext } from 'fluxible';

declare function createElementWithContext<P = {}>(context: FluxibleContext, props: P): React.ReactElement<P>;
export = createElementWithContext;
