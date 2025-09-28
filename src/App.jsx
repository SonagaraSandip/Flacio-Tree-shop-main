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
import BlogPageDetails from "./pages/BlogPageDetails";
import Featured from "./pages/Featured";
import ScrollToTopAction from "./pages/ScrollToTopAction";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Faqs from "./pages/Faqs";
import Faqs2 from "./pages/Faqs2";
import Error from "./pages/Error";
import Portfolio from "./pages/Portfolio";
import PopupAd from "./other/PopupAd";
import RightBanner from "./other/RightBanner";

//account
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import Account from "./pages/account/Account";

//from other
import TopBarLoader from "./other/TopBarLoader";
import CompareToggle from "./other/CompareToggle";

function AppWrapper() {
  const [homeLayout, setHomeLayout] = useState("modern");
  const location = useLocation();

  const transparent = location.pathname === "/" && homeLayout === "modern";
  const isCheckoutPage = location.pathname === "/checkout";
  return (
    <>
      <TopBarLoader />
      {!isCheckoutPage && (
        <Navbar
          setLayout={setHomeLayout}
          transparentUntilScroll={transparent}
        />
      )}
      {!isCheckoutPage && <CompareToggle />}
      <ScrollToTopAction />
      <Routes>
        <Route path="/" element={<Home layout={homeLayout} />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products" element={<Collections />} />
        <Route path="/collections/:collectionId" element={<Shop />} />
        <Route path="/products/:productName" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/blog/:tab/:id" element={<BlogPageDetails />} />
        <Route path="/blog/portfolio" element={<Portfolio />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/faqs" element={<Faqs />} />
        <Route path="/pages/faqs2" element={<Faqs2 />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {!isCheckoutPage && (
        <>
          <PopupAd />
          <RightBanner />
        </>
      )}
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
