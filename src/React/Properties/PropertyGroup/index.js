import React     from 'react';
import style     from 'PVWStyle/ReactProperties/PropertyGroup.mcss';
import factory   from '../../Properties/PropertyFactory';

const PropertyGroup = props => (
  <div className={props.show(props.viewData) ? style.container : style.hidden}>
    <div className={style.toolbar} >
      <span className={style.title}>{props.prop.ui.label}</span>
    </div>
    <div className={style.content}>
      {props.prop.children.map(p => factory(p, props.viewData, props.onChange))}
    </div>
  </div>);

PropertyGroup.propTypes = {
  show: React.PropTypes.func,
  prop: React.PropTypes.object,
  viewData: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default PropertyGroup;
