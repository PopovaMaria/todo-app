import React, {useState} from 'react'


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      isEditable: props.isEditable,  // TODO: default false
    }
    this.makeEditable = this.makeEditable.bind(this);
  }

  makeEditable() {
    this.setState({
      isEditable: true,
    })
  }

  onLabelChange= (e) => {
    this.setState({
        text: e.target.value
      }
    )
  }

  render() {
    const isEditable = this.state.isEditable;
    if (isEditable) {
      return <LineEdit text={this.state.text} onSubmit={this.makeEditable} onChange={this.onLabelChange}/>
    }
    else {
      return <Label text={this.state.text} onDoubleClick={this.makeEditable}/>
    }
  }



}


function Label(props) {
  const [text, _] = useState(props.text)

  return (
    <div onDoubleClick={props.onDoubleClick}>{text}</div>
  )
}

function LineEdit(props) {
  const [text, _] = useState(props.text)

  return (
    <form className="item-add-form d-flex"
          onSubmit={props.onSubmit}>
      <input type="text"
             placeholder="What needs to be done"
             value={text}
             onChange={props.onChange}
      />
    </form>

  )
}

export default Card
