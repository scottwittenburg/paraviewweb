import React from 'react';
import PropTypes from 'prop-types';

import style from 'PVWStyle/ReactCollapsibleControls/LightControl.mcss';

import CollapsibleWidget from '../../Widgets/CollapsibleWidget';
import Coordinate2DWidget from '../../Widgets/Coordinate2DWidget';
import LightButton from '../../Widgets/ToggleIconButtonWidget';
import NumberInputWidget from '../../Widgets/NumberInputWidget';

export default class LightControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.light.getLightProperties().lightTerms;

    // Bind callback
    this.onLightTermsChange = this.onLightTermsChange.bind(this);
    this.onLightPositionChange = this.onLightPositionChange.bind(this);
    this.toggleLight = this.toggleLight.bind(this);
  }

  onLightTermsChange(newVal, name) {
    const { light } = this.props;
    const newState = {};
    newState[name] = newVal;
    this.setState(newState);
    setImmediate(() => {
      light.setLightProperties({
        lightTerms: newState,
      });
    });
  }

  onLightPositionChange(event) {
    const { light } = this.props;
    light.setLightProperties({
      lightPosition: event,
    });
  }

  toggleLight(enabled) {
    const { light } = this.props;
    light.setLightingEnabled(enabled);
  }

  render() {
    const { light } = this.props;
    const { ka, kd, ks, alpha } = this.state;
    const lightButton = (
      <LightButton
        key="enable-light-button"
        onChange={this.toggleLight}
        value={light.getLightingEnabled()}
      />
    );
    return (
      <CollapsibleWidget
        title="Light Properties"
        subtitle={lightButton}
        activeSubTitle
      >
        <section className={style.container}>
          <Coordinate2DWidget
            onChange={this.onLightPositionChange}
            width={114}
            height={114}
            hideXY
          />
          <section className={style.controls}>
            <div className={style.inputRow}>
              <label>Ambient</label>
              <NumberInputWidget
                className={style.property}
                step={0.05}
                min={0.0}
                max={1.0}
                key="ka"
                value={ka}
                name="ka"
                onChange={this.onLightTermsChange}
              />
            </div>
            <div className={style.inputRow}>
              <label>Diffuse</label>
              <NumberInputWidget
                className={style.property}
                step={0.05}
                min={0.0}
                max={1.0}
                key="kd"
                value={kd}
                name="kd"
                onChange={this.onLightTermsChange}
              />
            </div>
            <div className={style.inputRow}>
              <label>Specular</label>
              <NumberInputWidget
                className={style.property}
                step={0.05}
                min={0.0}
                max={1.0}
                key="ks"
                value={ks}
                name="ks"
                onChange={this.onLightTermsChange}
              />
            </div>
            <div className={style.inputRow}>
              <label>Alpha</label>
              <NumberInputWidget
                className={style.property}
                step={1}
                min={0.0}
                max={100}
                key="alpha"
                value={alpha}
                name="alpha"
                onChange={this.onLightTermsChange}
              />
            </div>
          </section>
        </section>
      </CollapsibleWidget>
    );
  }
}

LightControl.propTypes = {
  light: PropTypes.object.isRequired,
};
