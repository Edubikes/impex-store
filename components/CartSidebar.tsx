
'use client';

import { X, Trash2, ShoppingBag, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';

export const CartSidebar = () => {
    const { items, removeItem, clearCart, totalUSD, setIsOpen, isOpen } = useCart();
    const { formatPrice, currency } = useCurrency();

    const handleCheckout = () => {
        // 1. Build message
        let message = `Hola! Quiero completar mi pedido en IMPEX:\n\n`;
        items.forEach(item => {
            message += `• ${item.title} (x${item.quantity}) - ${formatPrice(item.price)}\n`;
        });

        // Total in User's currency
        const totalDisplay = formatPrice(totalUSD.toFixed(2));
        message += `\n*TOTAL: ${totalDisplay}*\n\n`;
        message += `Quedo pendiente para el pago y envío. Gracias!`;

        // 2. Encode and open WhatsApp
        const encoded = encodeURIComponent(message);
        const waLink = `https://api.whatsapp.com/send?phone=5215512345678&text=${encoded}`;

        window.open(waLink, '_blank');
    };

    const totalDisplay = formatPrice(totalUSD.toFixed(2));

    return (
        <>
            <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">

                    {/* HEADER */}
                    <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-blue-600" /> Tu Carrito
                            <span className="text-sm font-normal text-gray-500">({items?.length || 0} ítems)</span>
                        </h2>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* EMPTY STATE */}
                    {(!items || items.length === 0) ? (
                        < div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                            <ShoppingCart className="w-20 h-20 text-gray-200 mb-6" />
                            <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tu carrito está vacío</p>
                            <p className="text-sm text-gray-400 mb-8">¡Las ofertas virales se acaban rápido!</p>
                            <button
                                onClick={toggleCart}
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Ver Ofertas
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ITEMS LIST */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4"
                                        >
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1">{item.title}</h3>
                                                <p className="text-blue-600 font-bold">{formatPrice(item.price)}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-gray-400">Cant: {item.quantity}</span>
                                                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* FOOTER & CHECKOUT */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="text-2xl font-black text-gray-900 dark:text-white">{totalDisplay}</span>
                                </div>

                                {/* TRUST BADGE */}
                                <div className="flex items-center gap-3 mb-6 bg-green-50 p-3 rounded-xl border border-green-100">
                                    <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <p className="text-xs text-green-800 font-medium leading-tight">
                                        Tu pedido está protegido por nuestra <strong>Garantía de Compra Segura</strong>.
                                    </p>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    <SiWhatsapp className="w-6 h-6" />
                                    Pagar por WhatsApp
                                </button>

                                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-wider">
                                    Atención personalizada inmediata
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div >

            {/* Overlay */}
            {
                isOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />
                )
            }
        </>
    );
};
