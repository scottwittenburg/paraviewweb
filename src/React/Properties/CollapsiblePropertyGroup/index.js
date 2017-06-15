import React     from 'react';
import style     from 'PVWStyle/ReactProperties/CollapsiblePropertyGroup.mcss';
import factory   from '../../Properties/PropertyFactory';


export default React.createClass({

  displayName: 'CollapsiblePropertyGroup',

  propTypes: {
    show: React.PropTypes.func,
    prop: React.PropTypes.object,
    viewData: React.PropTypes.object,
    onChange: React.PropTypes.func,
    collapsed: React.PropTypes.bool,
    onGroupCollapseChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      collapsed: true,
    };
  },

  render() {
    return (
      <div className={this.props.show(this.props.viewData) ? style.container : style.hidden}>
        <div className={style.toolbar} onClick={() => this.props.onGroupCollapseChange(!this.props.collapsed)}>
          <i className={this.state.collapsed ? style.collapsedIcon : style.expandedIcon} />
          <span className={style.title}>{this.props.prop.ui.label}</span>
        </div>
        <div className={this.state.collapsed ? style.hidden : style.content}>
          {this.props.prop.children.map(p => factory(p, this.props.viewData, this.props.onChange))}
        </div>
      </div>);
  },
});
