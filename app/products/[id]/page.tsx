"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-2xl">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white pt-24 px-6 md:px-20 flex flex-col md:flex-row items-center md:items-start gap-12">
      <Link
        href="/products"
        className="text-cyan-400 hover:text-purple-400 underline mb-4 inline-block"
      >
        ← Retour aux produits
      </Link>

      {/* Image placeholder */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://via.placeholder.com/400x400?text=No+Image+Available"
          alt="No image available"
          className="rounded-2xl shadow-lg border border-cyan-700 object-cover w-[400px] h-[400px]"
        />
      </div>

      {/* Product details */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">
          {product.name}
        </h1>
        <p className="text-gray-300 mb-6 text-lg">
          {product.description || "Aucune description disponible."}
        </p>

        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-semibold text-purple-400">
            {product.price} €
          </span>
          <span
            className={`text-sm px-4 py-2 rounded-full ${
              product.stockQuantity > 0
                ? "bg-green-600/30 text-green-400"
                : "bg-red-600/30 text-red-400"
            }`}
          >
            {product.stockQuantity > 0 ? "En stock" : "Rupture de stock"}
          </span>
        </div>

        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-90 transition">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}