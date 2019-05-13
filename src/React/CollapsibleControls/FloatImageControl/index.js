import React from 'react';
import PropTypes from 'prop-types';

import style from 'PVWStyle/ReactCollapsibleControls/FloatImageControl.mcss';

import CollapsibleWidget from '../../Widgets/CollapsibleWidget';
import LayerItem from './LayerItem';
import NumberSliderWidget from '../../Widgets/NumberSliderWidget';

export default class FloatImageControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      x: props.model.dimensions[0] / 2,
      y: props.model.dimensions[1] / 2,
    };

    this.attachListener(props.model);

    // Bind callback
    this.onProbeChange = this.onProbeChange.bind(this);
    this.attachListener = this.attachListener.bind(this);
    this.detachListener = this.detachListener.bind(this);
    this.updateLight = this.updateLight.bind(this);
    this.toggleProbe = this.toggleProbe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { model } = this.props;
    const nextModel = nextProps.model;

    if (model !== nextModel) {
      this.detachListener();
      this.attachListener(nextModel);

      // Force redraw
      this.setState((prevState) => ({ change: !prevState.change }));
    }
  }

  onProbeChange(e) {
    const { model } = this.props;
    const name = e.target.name;
    const newVal = Number(e.target.value);
    const { x, y } = this.state;

    this.setState((prevState) => ({
      x: prevState.x,
      y: prevState.y,
      [name]: newVal,
    }));
    model.getTimeChart(x, y);
  }

  attachListener(model) {
    this.changeSubscription = model.onProbeChange((data, envelope) => {
      this.forceUpdate();
    });
  }

  detachListener() {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
      this.changeSubscription = null;
    }
  }

  updateLight(event) {
    const { model } = this.props;
    model.setLight(255 - event.target.value);
    this.setState((prevState) => ({ change: !prevState.change }));
  }

  toggleProbe(newVal) {
    const { model } = this.props;
    model.getTimeProbe().enabled = !!newVal;

    if (model.getTimeProbe().enabled) {
      model.getTimeChart();
    }

    this.setState((prevState) => ({ change: !prevState.change }));

    model.getTimeProbe().triggerChange();
    model.render();
  }

  render() {
    const { model } = this.props;
    const timeProbe = model.getTimeProbe();
    const width = model.dimensions[0];
    const height = model.dimensions[1];
    const { x, y } = this.state;

    return (
      <div className={style.container}>
        <CollapsibleWidget title="Scene">
          {model.getLayers().map((item, idx) => (
            <LayerItem key={idx} item={item} model={model} />
          ))}
          <div className={style.item}>
            <div className={style.label}>Light</div>
            <div className={style.actions}>
              <input
                className={style.lightSlider}
                type="range"
                min="0"
                max="128"
                value={255 - model.getLight()}
                onChange={this.updateLight}
              />
            </div>
          </div>
        </CollapsibleWidget>
        <CollapsibleWidget
          title="Time probe"
          open={timeProbe.enabled}
          subtitle={timeProbe.enabled ? (timeProbe.value || 0).toString() : ''}
          visible={model.isMultiView()}
          onChange={this.toggleProbe}
        >
          <div className={style.item}>
            <div className={style.label}>X</div>
            <div className={style.actions}>
              <NumberSliderWidget
                step={1}
                min={0.0}
                max={width}
                key="x"
                value={x}
                name="x"
                onChange={this.onProbeChange}
              />
            </div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Y</div>
            <div className={style.actions}>
              <NumberSliderWidget
                step={1}
                min={0.0}
                max={height}
                key="y"
                value={y}
                name="y"
                onChange={this.onProbeChange}
              />
            </div>
          </div>
        </CollapsibleWidget>
      </div>
    );
  }
}

FloatImageControl.propTypes = {
  model: PropTypes.object.isRequired,
};
