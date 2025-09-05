import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import Featured from "./pages/Featured";
import ScrollToTopAction from "./pages/ScrollToTopAction";

//from other
import TopBarLoader from "./other/TopBarLoader";

function AppWrapper() {
  const [homeLayout, setHomeLayout] = useState("modern");
  const location = useLocation();

  const transparent = location.pathname === "/" && homeLayout === "modern";
  return (
    <>
      <TopBarLoader />
      <Navbar setLayout={setHomeLayout} transparentUntilScroll={transparent} />
      <ScrollToTopAction />
      <Routes>
        <Route path="/" element={<Home layout={homeLayout} />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products" element={<Collections />} />
        <Route path="/collections/:collectionId" element={<Shop />} />
        <Route path="/products/:productName" element={<Product />} />
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
