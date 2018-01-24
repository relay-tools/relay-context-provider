import React from "react";
import ReactDOM from "react-dom";
import RelayContextProvider from "..";
import withRelay from "../withRelay";

describe("withRelay", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("provides { relay } prop", () => {
    const environment = { internalStuff: '' };
    const variables = { viewerId: '123' };

    const PropsChecker = withRelay(props => {
      expect(typeof props.relay).toBe("object");
      expect(props.relay.environment).toBe(environment);
      expect(props.relay.variables).toBe(variables);
      return null;
    });

    ReactDOM.render(
      <RelayContextProvider environment={environment} variables={variables}>
        <PropsChecker />
      </RelayContextProvider>,
      node
    );
  });

  it("exposes the wrapped component as WrappedComponent", () => {
    const Component = () => <div />;
    const decorated = withRelay(Component);
    expect(decorated.WrappedComponent).toBe(Component);
  });

  it("exposes the instance of the wrapped component via wrappedComponentRef", () => {
    class WrappedComponent extends React.Component {
      render() {
        return null;
      }
    }
    const Component = withRelay(WrappedComponent);

    let ref;
    ReactDOM.render(
      <RelayContextProvider environment={{}} variables={{}}>
        <Component wrappedComponentRef={r => (ref = r)} />
      </RelayContextProvider>,
      node
    );

    expect(ref instanceof WrappedComponent).toBe(true);
  });

  it("hoists non-react statics from the wrapped component", () => {
    class Component extends React.Component {
      static foo() {
        return "bar";
      }

      render() {
        return null;
      }
    }
    Component.hello = "world";

    const decorated = withRelay(Component);

    expect(decorated.hello).toBe("world");
    expect(typeof decorated.foo).toBe("function");
    expect(decorated.foo()).toBe("bar");
  });
});
