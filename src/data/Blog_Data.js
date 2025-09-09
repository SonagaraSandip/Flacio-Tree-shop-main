//fashion
import Fashion from "../assets/blog/fashion/1_1296x.webp";
import RelatedFashion from "../assets/blog/fashion/Miniblog-3_180x.avif";

//Life -style
import LifeStyle from "../assets/blog/life-style/blog-4_720x.webp";
import LifeStylePreview from "../assets/blog/life-style/blog-4_180x.avif";

//News
import Traveling from "../assets/blog/News/travelingblog-6_720x.webp";
import TravelingPreview from "../assets/blog/News/travelingPreviewblog-6_180x.webp";
import Indoor from "../assets/blog/News/Indoorblog-2_720x.webp";
import IndoorPreview from "../assets/blog/News/IndoorPreviewblog-2_180x.webp";
import BestPlant from "../assets/blog/News/bestPlantblog-1_720x.webp";
import BestPlantPreview from "../assets/blog/News/BestPreviewblog-1_180x.avif";

//shorts
import Shorts from "../assets/blog/shorts/blog-5_720x.webp";

const Blog_Data = {
  fashion: [
    {
      id: "fashion-1",
      title: "Tips On How To Select The Right Tree",
      image: Fashion,
      previewImage: RelatedFashion,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "Fashion",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
      tags: [ "Baber" , "Baby Needs" , "Cosmetic" , "Organic"]
    },
  ],
  lifeStyle: [
    {
      id: "lifestyle-1",
      title: "The Best Tree Care Tips For You",
      image: LifeStyle,
      previewImage: LifeStylePreview,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "Life Style",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
      tags: ["Baber" , "Baby Needs" ,"Beauty", "Cosmetic", "New" , "Organic" ,"Simple"]
    },
  ],
  news: [
    {
      id: "news-1",
      title: "Traveling Solo Is Awesome",
      image: Traveling,
      previewImage: TravelingPreview,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "News",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
       tags: ["Baber" , "Baby Needs" ,"Beauty", "Cosmetic","Hot", "New" , "Organic" ,"Simple"]
    },
    {
      id: "news-2",
      title: "Indoor Plants Are Good For Health",
      image: Indoor,
      previewImage: IndoorPreview,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "News",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
    },
    {
      id: "news-3",
      title: "What Is The Best Plant For You?",
      image: BestPlant,
      previewImage: BestPlantPreview,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "News",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
    },
  ],
  shorts: [
    {
      id: "shorts-1",
      title: "The Best Plant For You?",
      image: Shorts,
      previewImage: Shorts,
      date: "September 05, 2025",
      author: "Tung Hoang",
      category: "Shorts",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum, ut suscipit necessitatibus corporis magni...",
      content: "Full content would go here...",
      tags: ["Beauty" , "Cosmetic" ,"Simple"]
    },
  ],
};

export default Blog_Data;
