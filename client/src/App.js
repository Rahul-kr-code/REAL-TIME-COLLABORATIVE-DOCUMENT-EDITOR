import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load", (data) => {
      setText(data);
    });

    socket.on("update", (data) => {
      setText(data);
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("edit", e.target.value);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Document Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "80vh",
          fontSize: "16px"
        }}
      />
    </div>
  );
}

export default App;
