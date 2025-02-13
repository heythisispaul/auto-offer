import { render } from "preact";
import { useState } from "preact/hooks";
import "../styles/main.tailwind.css"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-red-500">
      <h1 className="p-20">Hello from Preact!</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
