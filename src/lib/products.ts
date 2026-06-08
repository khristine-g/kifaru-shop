import { StaticImageData } from "next/image";
import coffeeImg from "@/assets/product-coffee.jpg";
import beadworkImg from "@/assets/product-beadwork.jpg";
import soapstoneImg from "@/assets/product-soapstone.jpg";
import basketImg from "@/assets/product-basket.jpg";
import kikoyImg from "@/assets/product-kikoy.jpg";
import maskImg from "@/assets/product-mask.jpg";
import catCoffee from "@/assets/category-coffee.jpg";
import catTextiles from "@/assets/category-textiles.jpg";
import catDecor from "@/assets/category-decor.jpg";
import catJewelry from "@/assets/category-jewelry.jpg";

export type Category = "coffee" | "textiles" | "decor" | "jewelry";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string | StaticImageData;
  tagline: string;
  description: string;
  origin: string;
  artisan: string;
  badge?: string;
}
export const CATEGORIES: { id: Category; label: string; description: string; image: string | StaticImageData}[] = [
  { id: "coffee", label: "Coffee", description: "Single-origin highland roasts", image: catCoffee },
  { id: "textiles", label: "Textiles", description: "Handwoven kikoy & fabric", image: catTextiles },
  { id: "decor", label: "Home Decor", description: "Soapstone & sisal baskets", image: catDecor },
  { id: "jewelry", label: "Jewelry", description: "Maasai beadwork pieces", image: catJewelry },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "nyeri-aa-single-origin",
    name: "Nyeri AA Single Origin",
    category: "coffee",
    price: 24,
    image: coffeeImg,
    tagline: "Blackberry, dark cocoa, citrus finish",
    description:
      "From the volcanic highlands of Nyeri, this washed AA-grade microlot delivers a bright, wine-like cup with notes of blackberry and dark cocoa. Roasted in small batches.",
    origin: "Nyeri County, Kenya",
    artisan: "Karatina Cooperative",
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "kiambu-peaberry-roast",
    name: "Kiambu Peaberry Reserve",
    category: "coffee",
    price: 28,
    image: coffeeImg,
    tagline: "Honey, jasmine, stone fruit",
    description:
      "A rare peaberry harvest from Kiambu's red soil estates. Floral aromatics with a long, syrupy finish.",
    origin: "Kiambu County, Kenya",
    artisan: "Highland Estates",
  },
  {
    id: "3",
    slug: "maasai-beadwork-clutch",
    name: "Maasai Beadwork Bracelet Stack",
    category: "jewelry",
    price: 65,
    image: beadworkImg,
    tagline: "Hand-strung glass beads",
    description:
      "Three stackable bracelets hand-strung by Maasai women artisans using traditional color symbolism — red for bravery, white for purity, blue for energy.",
    origin: "Kajiado, Kenya",
    artisan: "Naserian Women's Collective",
    badge: "Handcrafted",
  },
  {
    id: "4",
    slug: "kisii-soapstone-bowl",
    name: "Kisii Soapstone Bowl",
    category: "decor",
    price: 58,
    image: soapstoneImg,
    tagline: "Hand-carved cream marble",
    description:
      "Carved by hand from soft Kisii soapstone, each bowl is one of a kind with natural marbling. Perfect for keys, jewelry, or as a quiet centerpiece.",
    origin: "Tabaka, Kisii",
    artisan: "Tabaka Stone Carvers",
  },
  {
    id: "5",
    slug: "sisal-kiondo-basket",
    name: "Sisal Kiondo Basket",
    category: "decor",
    price: 95,
    image: basketImg,
    tagline: "Hand-woven sisal with leather",
    description:
      "The iconic Kenyan kiondo — woven from natural sisal fiber with hand-stitched leather handles. Ideal as a market tote or statement storage piece.",
    origin: "Machakos, Kenya",
    artisan: "Akamba Weavers Guild",
    badge: "Artisan Choice",
  },
  {
    id: "6",
    slug: "swahili-kikoy-throw",
    name: "Swahili Kikoy Throw",
    category: "textiles",
    price: 42,
    image: kikoyImg,
    tagline: "100% Kenyan cotton",
    description:
      "The traditional kikoy — a vibrant striped cotton wrap from the Swahili coast. Use as a beach throw, sarong, or accent textile.",
    origin: "Mombasa Coast",
    artisan: "Coastal Loom Workshop",
  },
  {
    id: "7",
    slug: "carved-heritage-mask",
    name: "Carved Heritage Mask",
    category: "decor",
    price: 145,
    image: maskImg,
    tagline: "Hand-carved Mvule wood",
    description:
      "A statement wall mask hand-carved from sustainable Mvule hardwood, featuring traditional geometric inlays inspired by ceremonial pieces.",
    origin: "Western Kenya",
    artisan: "Bukusu Master Carvers",
  },
  {
    id: "8",
    slug: "meru-light-roast",
    name: "Meru Slopes Light Roast",
    category: "coffee",
    price: 22,
    image: coffeeImg,
    tagline: "Lemon zest, brown sugar",
    description:
      "Grown on the slopes of Mount Kenya, this light roast highlights the bean's natural brightness — citrusy, clean, and crisp.",
    origin: "Meru, Kenya",
    artisan: "Mount Kenya Growers",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getByCategory = (cat: Category | "all") =>
  cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
