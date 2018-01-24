import {Component} from 'react';
import PropTypes from 'prop-types';
import withRelay from './withRelay';

export {withRelay};

/**
 * Creates Relay Context for child components
 */

class RelayContextProvider extends Component {
    getChildContext() {
        return {
            relay: {
                environment: this.props.environment,
                variables: this.props.variables
            }
        };
    }
    render() {
        return this.props.children;
    }
}

RelayContextProvider.childContextTypes = {
    relay: PropTypes.object.isRequired
};

RelayContextProvider.propTypes = {
    environment: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default RelayContextProvider;
