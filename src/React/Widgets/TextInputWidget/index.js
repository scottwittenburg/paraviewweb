import React from 'react';
import style from 'PVWStyle/ReactWidgets/TextInputWidget.mcss';

export default React.createClass({

  displayName: 'TextInputWidget',

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    maxWidth: React.PropTypes.string,
    icon: React.PropTypes.string,
    editing: React.PropTypes.bool,
    escEndsEdit: React.PropTypes.bool,
    blurEndsEdit: React.PropTypes.bool,
    grabFocus: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      value: '',
      className: '',
      icon: `${style.checkIcon}`,
      editing: false,
      escEndsEdit: false,
      blurEndsEdit: true,
      grabFocus: false,
    };
  },

  getInitialState() {
    return {
      editing: this.props.editing,
      valueRep: this.props.value,
    };
  },

  componentDidMount() {
    if (this.props.grabFocus && this.textInput) {
      this.textInput.focus();
    }
  },

  isEditing() {
    return this.state.editing;
  },

  valueChange(e) {
    var newVal = e.target.value;
    this.setState({ editing: true, valueRep: newVal });
  },

  endEditing() {
    if (!this.state.editing) return;
    this.setState({ editing: false });

    if (!this.props.onChange) return;
    if (this.props.name) {
      this.props.onChange(this.state.valueRep, this.props.name);
    } else {
      this.props.onChange(this.state.valueRep);
    }
  },

  handleKeyUp(e) {
    if (!this.textInput) return;
    if (e.key === 'Enter' || e.key === 'Return') {
      this.textInput.blur();
      if (!this.props.blurEndsEdit) this.endEditing();
    } else if (e.key === 'Escape') {
      this.setState({ valueRep: this.props.value });
      if (this.props.escEndsEdit) {
        // needs to happen at next idle so it happens after setState.
        setImmediate(() => {
          this.textInput.blur();
          if (!this.props.blurEndsEdit) this.endEditing();
        });
      }
    }
  },

  render() {
    const inlineStyle = this.props.maxWidth ? { maxWidth: this.props.maxWidth } : {};
    return (
      <div className={[style.container, this.props.className].join(' ')}>
        <input
          className={style.entry}
          type="text"
          value={this.state.editing ? this.state.valueRep : this.props.value}
          placeholder={this.props.placeholder}
          style={inlineStyle}
          onChange={this.valueChange}
          onBlur={this.props.blurEndsEdit ? this.endEditing : null}
          onKeyUp={this.handleKeyUp}
          ref={(c) => { this.textInput = c; }}
        />
        { // Use the check icon by default, but allow customization, for example: fa-search
        }
        <i className={[this.state.editing ? style.editingButton : style.button, this.props.icon].join(' ')} onClick={this.endEditing} />
      </div>);
  },
});
