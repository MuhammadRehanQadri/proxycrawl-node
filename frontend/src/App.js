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
            {/* <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} /> */}
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
