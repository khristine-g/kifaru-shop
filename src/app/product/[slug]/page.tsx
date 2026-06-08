// src/app/product/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductClientPage from "./ProductClientPage";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  // Type-guard: Extracts the string URL if product.image is a static Next.js import object
  const imageUrl = typeof product.image === "string" 
    ? product.image 
    : (product.image as any)?.src ?? "";

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

// 2. SERVER DATA LOADER
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound(); 
  }

  return <ProductClientPage product={product} />;
}