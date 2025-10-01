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
// import PopupAd from "./other/PopupAd";
import RightBanner from "./other/RightBanner";
import TopaddBanner from "./other/TopaddBanner";
import PortfolioDetails from "./pages/PortfolioDetails";
import Portfolio_Data from "./data/Portfolio_Data";

//account
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import Account from "./pages/account/Account";

//from other
import TopBarLoader from "./other/TopBarLoader";
import CompareToggle from "./other/CompareToggle";

function AppWrapper() {
  const location = useLocation();
  const [homeLayout, setHomeLayout] = useState("modern");
  const [topBannerActive, setTopBannerActive] = useState(
    () => !sessionStorage.getItem("topAdShown")
  );

  const transparent = location.pathname === "/" && homeLayout === "modern";
  const isCheckoutPage = location.pathname === "/checkout";
  const topBannerHeight = topBannerActive
    ? "pt-8 transition-all duration-300"
    : "";
  return (
    <>
      <TopBarLoader />
      {!isCheckoutPage && topBannerActive && (
        <TopaddBanner
          onClose={() => {
            setTopBannerActive(false);
            sessionStorage.setItem("topAdShown", "true");
          }}
        />
      )}

      {!isCheckoutPage && (
        <div className={topBannerHeight}>
          <Navbar
            setLayout={setHomeLayout}
            transparentUntilScroll={transparent}
          />
        </div>
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
        <Route
          path="/blog/portfolio"
          element={<Portfolio data={Portfolio_Data} />}
        />
        <Route
          path="/blog/portfolio/:id"
          element={<PortfolioDetails Data={Portfolio_Data} />}
        />
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
          {/* <PopupAd /> */}
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
