import { ListInputControl } from "./components/ListInputControl";

function App() {
  return (
    <ListInputControl
      label="Top 3 Priorities"
      placeholder="Type an item to add and press enter"
      required
      max={3}
      endpoint=""
    />
  );
}

export default App;
