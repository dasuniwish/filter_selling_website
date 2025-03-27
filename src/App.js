import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProductDetails from "./pages/ProdutDetails";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/trackorder" element={<TrackOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
