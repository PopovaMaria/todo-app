import React from "react";
import Card from "./card";

export default class App extends React.Component {
  render() {
    return(
      <div>
        <Card text="карточка" isEditable={false} />
      </div>)
  }
}

