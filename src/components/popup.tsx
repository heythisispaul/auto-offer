import { useState } from "preact/hooks";

export function Popup() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-base-100">
      <h1 className="p-20">Hello from Preact!</h1>
      <p>Counter: {count}</p>
      <button
        className="btn btn-primary"
        onClick={() => setCount((current) => current + 1)}
      >
        Increment
      </button>
    </div>
  );
}
