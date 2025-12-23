
'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export const Navbar = () => {
    const { items, setIsOpen } = useCart();
    const { currency, setCurrency } = useCurrency();

    const toggleCurrency = () => setCurrency(currency === 'USD' ? 'MXN' : 'USD');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo with Premium Font */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                            <span className="text-white font-black text-xl italic tracking-tighter">I</span>
                        </div>
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                            IMPEX<span className="text-blue-600">.</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-bold transition-colors uppercase text-xs tracking-widest">Inicio</a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-bold transition-colors uppercase text-xs tracking-widest">Ofertas</a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-bold transition-colors uppercase text-xs tracking-widest">Rastreo</a>
                        <a href="/admin" className="text-gray-400 hover:text-gray-600 text-[10px] uppercase tracking-widest flex items-center gap-1 border border-gray-200 px-2 py-1 rounded-full">
                            Admin
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Creating a cleaner currency toggle */}
                        <button
                            onClick={toggleCurrency}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-black text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors uppercase tracking-wider"
                        >
                            {currency === 'USD' ? '🇺🇸 USD' : '🇲🇽 MXN'}
                        </button>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-blue-600 transition-colors" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                                    {items.length}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Trust Mini Bar */}
            <div className="bg-blue-700 text-white text-[10px] sm:text-xs py-1.5 text-center font-bold tracking-widest uppercase">
                🚚 Envío Gratis a todo México • 🔒 Pago 100% Seguro • ⭐ Garantía de Satisfacción
            </div>
        </nav>
    );
};
