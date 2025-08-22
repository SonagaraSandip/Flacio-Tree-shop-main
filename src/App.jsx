import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import Featured from "./pages/Featured";

function AppWrapper() {
  const [homeLayout, setHomeLayout] = useState("modern");
  const location = useLocation();

  const transparent = location.pathname === "/" && homeLayout === "modern";
  return (
    <>
      <Navbar setLayout={setHomeLayout} transparentUntilScroll={transparent} />
      <Routes>
        <Route path="/" element={<Home layout={homeLayout} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/featured" element={<Featured />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
