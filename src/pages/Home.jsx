import HomeModern from "../layouts/HomeModern.jsx";
import HomeFlate from "../layouts/HomeFlate.jsx";

export default function Home({ layout }) {
  switch (layout) {
    case "modern":
      return <HomeModern />;
    case "flate":
      return <HomeFlate />;
    default:
      return <HomeModern />;
  }
}
