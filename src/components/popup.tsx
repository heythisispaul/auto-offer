import { useEffect, useState } from "preact/hooks";
import { ConfigureReminder } from "@/features/configure-reminder/components/ConfigureReminder";
import { Reminder } from "@/features/reminder/components/Reminder";

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

  useEffect(() => {
    chrome.runtime.connect({ name: "popup" });
  }, []);

  const isReminder = window.location.search.includes("reminder");

  if (isReminder) {
    return <Reminder />;
  }

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
      <button className="btn btn-neutral" onClick={test}>
        Test
      </button>
      <p>{window.location.href}</p>
      <ConfigureReminder />
    </div>
  );
}
