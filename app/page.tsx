
'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { useProducts } from '@/context/ProductContext';
import { useSearch } from '@/hooks/useSearch';
import { Search, Zap, TrendingUp, Sparkles, Home as HomeIcon, Smartphone, Shirt } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useSearch(products, searchQuery);
  const isSearching = searchQuery.length > 0;

  // Group products for sections (Only when not searching)
  const techProducts = products.filter(p => p.category === 'Electrónica' || p.title.toLowerCase().includes('watch') || p.title.toLowerCase().includes('audifonos'));
  const homeProducts = products.filter(p => p.category === 'Hogar' || p.title.toLowerCase().includes('luz') || p.title.toLowerCase().includes('foco'));
  const fashionProducts = products.filter(p => p.category === 'Moda' || p.title.toLowerCase().includes('mochila') || p.title.toLowerCase().includes('lentes'));
  const trendingProducts = products.slice(0, 4); // Just take the top 4 as trending

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Navbar />
      <CartSidebar /> // Sidebar is fixed, so placement here is fine

      {/* SEARCH HEADER (Mobile/Desktop) */}
      <div className="pt-24 px-4 max-w-7xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos, marcas y más..."
            className="w-full p-4 pl-12 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {isSearching ? (
        // --- SEARCH RESULTS GRID ---
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 dark:text-white">
            Resultados para "{searchQuery}" ({filteredProducts.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No encontramos nada con esa descripción.</p>
                <p className="text-sm">Intenta con "Reloj", "Tenis" o "Luz"</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // --- SECTIONS LAYOUT (NETFLIX STYLE) ---
        <div className="space-y-12 max-w-7xl mx-auto px-4">

          {/* HERO BANNER */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 md:p-12 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <span className="bg-white/20 backdrop-blur text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                OFERTAS DEL DÍA
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                Lo Más Viral de Internet
              </h1>
              <p className="text-white/90 mb-8 font-medium">
                Descubre los productos que están rompiendo las redes. Envío Gratis en 24 horas.
              </p>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                Ver Ofertas
              </button>
            </div>
            {/* Decorative Pattern */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-20"></div>
          </div>

          {/* SECTION: TRENDING */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tendencias</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          {/* SECTION: TECH */}
          {techProducts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Smartphone className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tecnología</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {techProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION: HOME */}
          {homeProducts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <HomeIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hogar & Deco</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {homeProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION: FASHION */}
          {fashionProducts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Shirt className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Moda</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {fashionProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </main>
  );
}
