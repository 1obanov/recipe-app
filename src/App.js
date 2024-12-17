import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./layouts/Main";

function App() {
  return (
    <Router basename='/recipe-app'>
      <Main />
    </Router>
  );
}

export default App;
