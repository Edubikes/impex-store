
'use client';

import { ShoppingCart, Star, Zap, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductCardProps {
    id: string;
    title: string;
    price: string; // Always passed in USD base
    image: string;
    description: string;
    isAdminPreview?: boolean;
}

export const ProductCard = ({ id, title, price, image, description, isAdminPreview = false }: ProductCardProps) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    // Generate a random "Sold" number for social proof (deterministic based on title length)
    const soldCount = 100 + (title.length * 7);
    const rating = 4.8 + (title.length % 2) * 0.1;

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">

            {/* --- IMAGE SECTION --- */}
            <div
                className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900"
                onContextMenu={(e) => e.preventDefault()} // BLOQUEO CLICK DERECHO
            >
                <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
                    <Zap className="w-3 h-3" fill="currentColor" /> MÁS VENDIDO
                </span>

                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" // NO DRAG
                />

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {!isAdminPreview && (
                        <button
                            onClick={() => addToCart({ id, title, price, image })}
                            className="bg-white text-gray-900 font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2 hover:bg-amber-400"
                        >
                            <ShoppingCart className="w-5 h-5" /> Agregar
                        </button>
                    )}
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{rating}</span>
                    <span className="text-xs text-gray-400">({soldCount} vendidos)</span>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {description}
                </p>

                {/* --- PRICE & CTA --- */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-end justify-between">
                    <div>
                        <span className="block text-xs text-gray-400 line-through">
                            {formatPrice((parseFloat(price) * 1.4).toString())} {/* Fake MSRP */}
                        </span>
                        <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                            {formatPrice(price)}
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        {!isAdminPreview && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg mb-1 animate-pulse">
                                🔥 ¡Quedan 3 piezas!
                            </span>
                        )}
                        {isAdminPreview ? (
                            <span className="text-xs font-mono text-gray-400">Admin Preview</span>
                        ) : (
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                <ShieldCheck className="w-3 h-3" /> Garantía
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
