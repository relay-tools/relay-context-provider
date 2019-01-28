## Deprecation Notice
This package is deprecated and no longer works as of Relay >=2.0.0. Please instead use `ReactRelayContext` from 'react-relay`.

# relay-context-provider
Adds relay environment and variables to React Context. Use then when you are fetching queries manually and need to render `fragmentContainers`. This is useful for server side rendering. 

## Install
yarn add relay-context-provider

## Usage
```js

import {fetchQuery} from 'react-relay';
import RelayContextProvider from 'relay-context-provider';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

async function (res, req, next) {
    const data = await fetchQuery(environment, query, res.query);
    const html = ReactDOMServer.renderToString(
        <RelayContextProvider
            environment={environment}
            variables={res.query}
        >
            <MyComponent {...data} />
        </RelayContextProvider>
    );

    return html;
});
```

### Isomorphic Example
See the full isomorphic/universal/server side rendered example here: https://github.com/robrichard/relay-modern-isomorphic-example
