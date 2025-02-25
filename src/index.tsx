import { render } from "preact";
import { Popup } from "./components/popup";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/main.tailwind.css";

function App() {
  return (
    <ErrorBoundary>
      <Popup />
    </ErrorBoundary>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
