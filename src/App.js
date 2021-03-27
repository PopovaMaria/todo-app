import React, {useState, useRef} from "react";
import Editable from "./card/editable_label";
import Columns from "./columns_page";

function App() {

  const [task, setTask] = useState("");
  const inputRef = useRef();

  return (
    <Columns>
      </Columns>
  );
}

export default App;


