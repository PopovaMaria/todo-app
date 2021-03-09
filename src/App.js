import React from "react";
import EditableLabel from "./card/editable_label";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      labelToEdit: "Editable label"
    }
  }

  changeLabelEvent = label => {
    this.setState({labelToEdit: label})
  }

  render() {
    return(
      <div>
        <EditableLabel
          labelValue={this.state.labelToEdit}
          editChangeEvent={this.changeLabelEvent}
        />
      </div>
    )
  }
}


