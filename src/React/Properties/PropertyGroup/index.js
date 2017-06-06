import React     from 'react';
import style     from 'PVWStyle/ReactProperties/PropertyGroup.mcss';
import factory   from '../../Properties/PropertyFactory';

function notifyCollapseChange(props) {
  if (props.onChange) {
    props.onChange({
      id: props.prop.data.id,
      value: !props.prop.data.value,
    });
  }
}

const PropertyGroup = (props) => {
  const collapsed = props.prop.data.value;

  return (
    <div className={style.container}>
      <div className={style.toolbar} onClick={() => notifyCollapseChange(props)}>
        <i className={collapsed ? style.collapsedIcon : style.expandedIcon} />
        <span className={style.title}>{props.prop.ui.groupName}</span>
      </div>
      <div className={collapsed ? style.hidden : style.content}>
        {props.prop.children.map(p => factory(p, props.viewData, props.onChange))}
      </div>
    </div>);
};

PropertyGroup.propTypes = {
  prop: React.PropTypes.object,
  viewData: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default PropertyGroup;
