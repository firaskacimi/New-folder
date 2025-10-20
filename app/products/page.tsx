"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-2xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white pt-24 px-6 md:px-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">
        Nos Produits
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          Aucun produit disponible.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-cyan-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer">
                {/* Product Image Placeholder */}
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <img
                    src="https://via.placeholder.com/300x200?text=Product+Image"
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Info */}
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm line-clamp-2">
                  {product.description || "Aucune description disponible."}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">
                    {product.price} €
                  </span>
                  
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.stockQuantity > 0
                        ? "bg-green-600/30 text-green-400"
                        : "bg-red-600/30 text-red-400"
                    }`}
                  >
                    {product.stockQuantity > 0 ? "En stock" : "Rupture"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}