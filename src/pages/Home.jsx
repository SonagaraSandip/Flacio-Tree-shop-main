import HomeModern from "../layouts/HomeModern.jsx";
import HomeFlate from "../layouts/HomeFlate.jsx";
import HomeCollection from "../layouts/HomeCollection.jsx";

export default function Home({ layout }) {
  switch (layout) {
    case "modern":
      return <HomeModern />;
    case "flate":
      return <HomeFlate />;
    case "collection":
      return <HomeCollection />;
    default:
      return <HomeModern />;
  }
}
