

import React from 'react';

import   ComponentToReact from '../../../Component/React/ComponentToReact';
import        FieldSearch from '../FieldSearch';
import      FieldSelector from '../../Native/FieldSelector';
import              style from '../../../../style/InfoVizReact/FieldExplorer.mcss';


export default class FieldExplorer extends React.Component {

  constructor(props) {
    super(props);

    this.subscriptions = [];
    this.unselectedFields = null;
    this.selectedFields = null;

    // Autobinding
    // this.filterOptions = this.filterOptions.bind(this);
  }

  // One-time initialization.
  componentWillMount() {
    // this.subscriptions.push();
    this.selectedFields = FieldSelector.newInstance({ provider: this.props.provider });
    this.unselectedFields = FieldSelector.newInstance({ provider: this.props.provider });
  }

  componentWillUnmount() {
    // while (this.subscriptions && this.subscriptions.length) {
    //   this.subscriptions.pop().unsubscribe();
    // }
    // this.subscriptions = null;

    this.unselectedFields.destroy();
    this.unselectedFields = null;

    this.selectedFields.destroy();
    this.selectedFields = null;
  }

  render() {
    return (
      <div className={style.container}>
        <div style={{ overflow: 'auto', position: 'absolute', top: 0, width: '100%', height: 'calc(50% - 30px)' }}>
          <ComponentToReact className={style.fullSize} component={this.selectedFields} />
        </div>
        <div style={{ position: 'absolute', top: 'calc(50% - 30px)', height: 30, width: '100%' }}>
          <FieldSearch provider={this.props.provider} />
        </div>
        <div style={{ overflow: 'auto', position: 'absolute', bottom: 0, width: '100%', height: 'calc(50% - 30px)' }}>
          <ComponentToReact className={style.fullSize} component={this.unselectedFields} />
        </div>
      </div>);
  }
}

FieldExplorer.propTypes = {
  provider: React.PropTypes.object,
};

FieldExplorer.defaultProps = {};
