import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

/**
 * A public higher-order component to access the imperative API
 */
const withRelay = (Component) => {
  const C = (props, {relay}) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return <Component {...remainingProps} ref={wrappedComponentRef} relay={relay} />;
  };

  C.displayName = `withRelay(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  };
  C.contextTypes = {
    relay: PropTypes.shape({
      environment: PropTypes.object.isRequired,
      variables: PropTypes.object.isRequired
    })
  };

  return hoistStatics(C, Component);
};

export default withRelay;
