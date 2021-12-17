import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.css";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <main className="my-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
