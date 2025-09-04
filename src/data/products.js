// products.js

import TigerGreen from "../assets/Home/Tiger-Aloe/tiger-green-360x.png";
import TigerBlack from "../assets/Home/Tiger-Aloe/tiger-black-360x.png";
import TigerPink from "../assets/Home/Tiger-Aloe/Tiger-aloe-pink_600x.webp";

import RubbyRubberFront from "../assets/Home/rubby-rubber/Rubby-rubber_540x.webp";
import RubbyRubberBack from "../assets/Home/rubby-rubber/Rubby-rubber_540xpink.webp";

import PeaseLilyFront from "../assets/Home/Pease-lily/Pease-lily-360x.webp";
import PeaseLilyBack from "../assets/Home/Pease-lily/Pease-lily-black-360x.webp";

import PhilippineFront from "../assets/Home/Philippine/PhilippineFront.webp";
import PhilippineBack from "../assets/Home/Philippine/Philippine-Back-540x.webp";
import PhilippinePreview from "../assets/product/360/360-1.jpg";

import BeginnerFront from "../assets/Home/Beginner/Beginner-front_540x1.webp";
import BeginnerPink from "../assets/Home/Beginner/Beginner-front_540xpink.webp";
import BeginnerBack from "../assets/Home/Beginner/Beginner-back_540x.webp";

import DragonFront from "../assets/Home/Dragon/Dragon-front_540x.webp";
import DragonBack from "../assets/Home/Dragon/Dragon-back_540x.webp";

import PalmFront from "../assets/Home/palm/Palm_540x.webp";
import PalmBack from "../assets/Home/palm/Palm_540xBack.webp";
import PalmVideo from "../assets/Home/palm/PalmVideo.mp4";
import PalmVideoPreview from "../assets/product/videoPreviewImage.webp";

import BoughtFront from "../assets/Home/Bought-together/Bought-together-front_540x.webp";
import BoughtBack from "../assets/Home/Bought-together/Bought-together-back_540x.webp";

import UmbrellaFront from "../assets/Home/Umbrella-Tree/14-9_360x.webp";
import UmbrellaBack from "../assets/Home/Umbrella-Tree/16-7_600xBack.webp";

import JadeSucculentFront from "../assets/Home/jade-suss/1_7d889b7e-e9b3-48c1-8e8d-a696e8d84f7d_360x.webp";
import JadeSucculentBack from "../assets/Home/jade-suss/2_600xback.webp";
import JadeSucculentBlack from "../assets/Home/jade-suss/3_1080x1080black.webp";

const products = [
  {
    id: 1,
    name: "Umbrella Tree",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "24 sold in last 09 hours",
    originalPrice: 90,
    discountPercent: 31,
    discountPrice: 51,
    frontImage: UmbrellaFront,
    backImage: UmbrellaBack,
    isTopRated: false,
    isBestSelling: true,
    inStock: true,
    AirPurifying: true,
    CeramicPots: true,
    HerbSeeds: false,
    IndoorPlants: false,
    variants: [
      {
        color: "Geometric",
        image: UmbrellaFront,
        price: 80,
        inStock: true,
      },
      {
        color: "Floral",
        image: UmbrellaBack,
        price: 82,
        inStock: true,
      },
    ],
  },
  {
    id: 2,
    name: "Tiger Aloe",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "31 sold in last 13 hours",
    originalPrice: 153.0,
    frontImage: TigerGreen,
    backImage: TigerBlack,
    isTopRated: true,
    isBestSelling: false,
    inStock: true,
    AirPurifying: true,
    CeramicPots: true,
    HerbSeeds: false,
    IndoorPlants: false,
    variants: [
      {
        color: "Black",
        hex: "#000000",
        image: TigerBlack,
        price: 152.0,
        inStock: true,
      },
      {
        color: "Pink",
        hex: "#FFC0CB",
        image: TigerPink,
        price: 150.0,
        inStock: true,
      },
      {
        color: "Blue",
        hex: "#0057FF",
        image: TigerGreen,
        price: 155.0,
        inStock: true,
      },
    ],
  },
  {
    id: 3,
    name: "Ruby Rubber Tree",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "29 sold in last 17 hours",
    originalPrice: 90.0,
    discountPercent: 43,
    discountPrice: 61.0,
    frontImage: RubbyRubberFront,
    backImage: PeaseLilyBack,
    isTopRated: true,
    isBestSelling: true,
    inStock: true,
    AirPurifying: true,
    CeramicPots: true,
    HerbSeeds: true,
    IndoorPlants: true,
    variants: [
      {
        color: "Black",
        hex: "#000000",
        image: RubbyRubberFront,
        price: 52.0,
        inStock: true,
      },
      {
        color: "Pink",
        hex: "#FFC0CB",
        image: RubbyRubberBack,
        price: 54.0,
        inStock: true,
      },
      {
        color: "Blue",
        hex: "#0057FF",
        image: BeginnerBack,
        price: 155.0,
        inStock: true,
      },
    ],
  },
  {
    id: 4,
    name: "Peace Lily",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 4,
    sellOrder: "43 sold in last 24 hours",
    originalPrice: 90,
    discountPercent: 33,
    discountPrice: 64.0,
    frontImage: PeaseLilyFront,
    backImage: PeaseLilyBack,
    isTopRated: true,
    isBestSelling: true,
    inStock: true,
    AirPurifying: true,
    CeramicPots: true,
    HerbSeeds: false,
    IndoorPlants: false,
    variants: [
      {
        color: "Black",
        hex: "#000000",
        image: PeaseLilyBack,
        price: 60,
        inStock: true,
      },
      {
        color: "White",
        hex: "#FFFFFF",
        image: PeaseLilyFront,
        price: 62,
        inStock: true,
      },
      {
        color: "Pink",
        hex: "#FFC0CB",
        image: JadeSucculentFront,
        price: 54.0,
        inStock: true,
      },
    ],
  },
  {
    id: 5,
    name: "A Philippine Upsell",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "27 sold in last 14 hours",
    originalPrice: 80,
    frontImage: PhilippineFront,
    backImage: PhilippineBack,
    isTopRated: true,
    isBestSelling: false,
    inStock: true,
    AirPurifying: false,
    CeramicPots: true,
    HerbSeeds: true,
    IndoorPlants: false,
    variants: [
      {
        color: "Plaid",
        image: PhilippineFront,
        price: 80,
        inStock: true,
      },
      {
        color: "Floral",
        image: PhilippineBack,
        price: 85,
        inStock: true,
      },
      {
        type: "360",
        imagePreview: PhilippinePreview,
        image: [
          "../assets/product/360/360-1.jpg",
          "../assets/product/360/360-2.jpg",
          "../assets/product/360/360-3.jpg",
          "../assets/product/360/360-4.jpg",
          "../assets/product/360/360-5.jpg",
          "../assets/product/360/360-7.jpg",
          "../assets/product/360/360-8.jpg",
          "../assets/product/360/360-9.jpg",
          "../assets/product/360/360-10.jpg",
          "../assets/product/360/360-11.jpg",
          "../assets/product/360/360-12.jpg",
          "../assets/product/360/360-13.jpg",
          "../assets/product/360/360-14.jpg",
          "../assets/product/360/360-15.jpg",
          "../assets/product/360/360-16.jpg",
        ],
      },
    ],
  },
  {
    id: 6,
    name: "The Beginner Set",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "29 sold in last 15 hours",
    originalPrice: 130,
    frontImage: BeginnerFront,
    backImage: BeginnerBack,
    isTopRated: true,
    isBestSelling: true,
    inStock: true,
    AirPurifying: true,
    CeramicPots: true,
    HerbSeeds: false,
    IndoorPlants: true,
    size: [30, 50, 60],
    variants: [
      {
        color: "Pink",
        hex: "#FFC0CB",
        image: BeginnerPink,
        price: 145,
        inStock: true,
      },
      {
        color: "Orange",
        hex: "#FFA500",
        image: BeginnerBack,
        price: 145,
        inStock: true,
      },
      {
        color: "Black",
        hex: "#000000",
        image: BeginnerFront,
        price: 130,
        inStock: true,
      },
    ],
  },
  {
    id: 7,
    name: "Pink Dragon Tree",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "48 sold in last 18 hours",
    originalPrice: 100,
    discountPrice: 80,
    frontImage: DragonFront,
    backImage: DragonBack,
    isTopRated: true,
    isBestSelling: false,
    inStock: false,
    outOfStock: true,
    AirPurifying: true,
    CeramicPots: false,
    HerbSeeds: true,
    IndoorPlants: true,
    variants: [
      {
        color: "Striped",
        image: DragonFront,
        price: 80,
        inStock: false,
      },
      {
        color: "Plaid",
        image: DragonFront,
        price: 80,
        inStock: false,
      },
    ],
  },
  {
    id: 8,
    name: "Palm",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "51 sold in last 22 hours",
    originalPrice: 50,
    frontImage: PalmFront,
    backImage: PalmBack,
    isTopRated: true,
    isBestSelling: true,
    inStock: true,
    AirPurifying: false,
    CeramicPots: true,
    HerbSeeds: true,
    IndoorPlants: false,
    variants: [
      {
        color: "White",
        hex: "#FFFFFF",
        image: PalmFront,
        price: 50,
        inStock: true,
      },
      {
        color: "Blue",
        hex: "#0057FF",
        image: PalmBack,
        price: 54,
        inStock: true,
      },
      {
        imagePreview: PalmVideoPreview,
        video: PalmVideo,
        price: null,
        inStock: true,
      },
    ],
  },
  {
    id: 9,
    name: "Bought Together",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "13 sold in last 02 hours",
    originalPrice: 82,
    frontImage: BoughtFront,
    backImage: BoughtBack,
    isTopRated: true,
    isBestSelling: false,
    inStock: true,
    AirPurifying: false,
    CeramicPots: true,
    HerbSeeds: true,
    IndoorPlants: true,
    variants: [
      {
        color: "Red",
        hex: "#FF0000",
        image: BoughtFront,
        price: 82,
        inStock: true,
      },
      {
        color: "Gray",
        hex: "#808080",
        image: BoughtBack,
        price: 86,
        inStock: true,
      },
    ],
  },
  {
    id: 10,
    name: "Jade Succulent",
    description:
      "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    rating: 0,
    sellOrder: "35 sold in last 11 hours",
    originalPrice: 60,
    priceRange: 153,
    frontImage: JadeSucculentFront,
    backImage: JadeSucculentBack,
    isTopRated: false,
    isBestSelling: true,
    inStock: true,
    AirPurifying: false,
    CeramicPots: true,
    HerbSeeds: true,
    IndoorPlants: true,
    variants: [
      {
        color: "Pink",
        hex: "#FFC0CB",
        image: JadeSucculentFront,
        price: 82,
        inStock: true,
      },
      {
        color: "Red",
        hex: "#FF0000",
        image: JadeSucculentBack,
        price: 84,
        inStock: true,
      },
      {
        color: "Black",
        hex: "#000000",
        image: JadeSucculentBlack,
        price: 86,
        inStock: true,
      },
    ],
  },
];

export default products;
