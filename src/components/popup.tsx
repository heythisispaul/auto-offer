import { useState } from "preact/hooks";
import { ConfigureReminder } from "@/features/configure-reminder/components/ConfigureReminder";

export function Popup() {
  const [count, setCount] = useState(0);

  const test = () => {
    chrome.tabs.query({ active: true }, ([tab]) => {
      if (!tab?.id) {
        return;
      }

      chrome.tabs.sendMessage(tab.id, { message: "test" });
    });
  };

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
      <button className="btn btn-secondary" onClick={test}>
        Test
      </button>
      <ConfigureReminder />
    </div>
  );
}
