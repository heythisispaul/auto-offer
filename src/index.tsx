import { render } from "preact";
import { Popup } from "./components/popup";
import "./styles/main.tailwind.css";

function App() {
  return <Popup />;
}

render(<App />, document.getElementById("app") as HTMLElement);
