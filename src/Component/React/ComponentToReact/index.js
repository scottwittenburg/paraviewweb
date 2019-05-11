import React from 'react';
import PropTypes from 'prop-types';

export default class ComponentToReact extends React.Component {
  constructor(props) {
    super(props);

    // Bind callback
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    const { component } = this.props;
    if (component) {
      component.setContainer(this.container);
      component.resize();
    }
  }

  componentDidUpdate() {
    const { component } = this.props;
    if (component) {
      component.resize();
    }
  }

  componentWillUnmount() {
    const { component } = this.props;
    if (component) {
      component.setContainer(null);
    }
  }

  resize() {
    const { component } = this.props;
    if (component) {
      component.resize();
    }
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={className}
        ref={(c) => {
          this.container = c;
        }}
      />
    );
  }
}

ComponentToReact.propTypes = {
  className: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};
