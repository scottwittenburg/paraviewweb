import React from 'react';
import PropTypes from 'prop-types';

import style from 'PVWStyle/ReactCollapsibleControls/FloatImageControl.mcss';

export default class FloatImageControlLayerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      dropDown: false,
    };

    // Bind callback
    this.toggleMesh = this.toggleMesh.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.updateColorBy = this.updateColorBy.bind(this);
  }

  toggleMesh() {
    const { item, model } = this.props;
    if (item.hasMesh) {
      model.updateMaskLayerVisibility(item.name, !item.meshActive);
      this.setState((prevState) => ({ change: !prevState.change }));
    }
  }

  toggleVisibility() {
    const { item, model } = this.props;
    model.updateLayerVisibility(item.name, !item.active);
    this.setState((prevState) => ({ change: !prevState.change }));
  }

  toggleDropDown() {
    const { item } = this.props;
    if (item.arrays.length > 1) {
      this.setState((prevState) => ({ dropDown: !prevState.dropDown }));
    }
  }

  updateColorBy(event) {
    const { item, model } = this.props;
    model.updateLayerColorBy(item.name, event.target.dataset.color);
    this.toggleDropDown();
  }

  render() {
    const { item } = this.props;
    const visible = item.active;
    const meshVisible = item.meshActive;
    const meshAvailable = item.hasMesh;
    const hasDropDown = item.arrays.length > 1;
    const { dropDown } = this.state;

    return (
      <div className={style.item}>
        <div className={style.sceneLabel}>{item.name}</div>
        <div className={style.sceneActions}>
          <i
            className={
              meshAvailable
                ? meshVisible
                  ? style.meshButtonOn
                  : style.meshButtonOff
                : style.hidden
            }
            onClick={this.toggleMesh}
          />
          <i
            className={visible ? style.visibleButtonOn : style.visibleButtonOff}
            onClick={this.toggleVisibility}
          />
          <i
            className={
              hasDropDown ? style.dropDownButtonOn : style.dropDownButtonOff
            }
            onClick={this.toggleDropDown}
          />
          <div
            onClick={this.updateColorBy}
            className={dropDown ? style.menu : style.hidden}
          >
            {item.arrays.map((color) => (
              <div
                key={color}
                data-color={color}
                className={
                  color === item.array ? style.selectedMenuItem : style.menuItem
                }
              >
                {color}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

FloatImageControlLayerItem.propTypes = {
  item: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
};
