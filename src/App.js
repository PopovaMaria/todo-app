import React, {useState, useRef} from "react";
import Editable from "./card/editable_label";

function App() {

  const [task, setTask] = useState("");
  const inputRef = useRef();

  return (
    <Editable
      text={task}
      placeholder="Description for the task"
      childRef={inputRef}
      type="textarea"
    >
  <textarea
    name="description"
    placeholder="Description for the task"
    rows="5"
    value={task}
    ref={inputRef}
    onChange={e => setTask(e.target.value)}
  />
    </Editable>
  );
}

export default App;