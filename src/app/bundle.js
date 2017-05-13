import { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loader !== this.props.loader) {
      this.load(nextProps);
    }
  }

  load = ({ loader }) => {
    this.setState({
      mod: null,
    });
    loader((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod,
      })
    });
  };

  render() {
    return this.state.mod
      ? this.props.children(this.state.mod)
      : (<div>loading...</div>);
  }
}

export default Bundle;