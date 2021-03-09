import React, { Component } from "react";
import { anyPass, isEmpty, isNil } from "ramda";
import { generate } from "short-id";


class EditableLabel extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      uniqueId: generate(),
      isEditing: false,
      hasError: false,
      previewLabel: this.props.labelValue
    };
  }

  toggleEditMode = () => {
    const { isEditing, previewLabel } = this.state;
    const { editChangeEvent } = this.props;

    if (isEditing === true) {
      if (editChangeEvent) {
        this.setState({ isEditing: false });
        editChangeEvent(previewLabel);
      }
      return;
    }

    this.setState({ isEditing: true });
  };


  simpleLabelWithClickAction = () => {
    const {
      labelValue,
      placeholder,
    } = this.props;

    const showPlaceholder = isEmptyOrNil(labelValue);
    const showableLabel = showPlaceholder ? placeholder : labelValue;

    return (
      <p key="label-value"  onClick={this.toggleEditMode}>
        {showableLabel}
      </p>
    );
  };


  watchForEnterClick = event => {
    if (event.keyCode === 13) {
      const { hasError } = this.state;
      if (!hasError) {
        this.toggleEditMode();
      }
    }
  };


  inputOnChangeEvent = event => {
    const previewLabel = event.target.value;

    if (previewLabel.length > 0) {
      this.setState({
        hasError: false,
        previewLabel
      });
      return;
    }

    this.setState({ previewLabel });
  };


  inputToEditLabel = () => {
    const { previewLabel } = this.state;
    return [
      <input
        type="text"
        value={previewLabel}
        key="input-value-label"
        onChange={this.inputOnChangeEvent}
        onKeyUp={this.watchForEnterClick}
        autoFocus
      />,

    ];
  };


  getErrorMessage = () => {
    const { hasError } = this.state;
    const { hideErrors, customErrorMessage} = this.props;
    const showErrors = !hideErrors && hasError;
    if (showErrors && Array.isArray(customErrorMessage)) {
      return (
        <ul >
          {customErrorMessage.map(error => (
            <li key={generate()}>{error}</li>
          ))}
        </ul>
      );
    }

    if (showErrors) {
      return <span >{customErrorMessage}</span>;
    }

    return null;
  };


  render() {
    const { id, isEditing, uniqueId} = this.state;

    const showThisComponent = isEditing
      ? this.inputToEditLabel()
      : this.simpleLabelWithClickAction();
    const error = this.getErrorMessage();
    const componentId = isEmptyOrNil(id) ? `editable-label-id-${uniqueId}` : id;

    return (
      <div id={componentId} key={componentId} >
        {showThisComponent}
        {error}
      </div>
    );
  }
}

const isEmptyOrNil = anyPass([isEmpty, isNil]);





export default EditableLabel;
