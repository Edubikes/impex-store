
'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Search, Loader2, Plus, ArrowLeft, Copy, Zap, Edit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts, Product } from '@/context/ProductContext';
import { VIRAL_PRODUCTS } from '@/data/viralProducts';
import { EditProductModal } from '@/components/EditProductModal';
import Link from 'next/link';

export default function AdminPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [scrapedData, setScrapedData] = useState<any>(null);
    const [error, setError] = useState('');
    const { products, addProduct, addProducts, updateProduct, removeProduct } = useProducts();
    const [successMsg, setSuccessMsg] = useState('');

    // Edit Mode State
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [inventorySearch, setInventorySearch] = useState('');

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError('');
        setScrapedData(null);
        setSuccessMsg('');

        try {
            const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
            const json = await res.json();

            if (json.success) {
                setScrapedData(json.data);
            } else {
                setError(json.error || 'Failed to fetch product');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const confirmAdd = () => {
        if (!scrapedData) return;

        if (Array.isArray(scrapedData)) {
            const batch = scrapedData.map((item: any, idx: number) => ({
                id: `${url}-${idx}-${new Date().getTime()}`,
                title: item.title,
                price: item.price || "0.00",
                image: item.image,
                description: item.description,
                category: "Imported Batch"
            }));
            addProducts(batch);
            setSuccessMsg(`Successfully cloned ${batch.length} products!`);
        } else {
            addProduct({
                id: url,
                title: scrapedData.title,
                price: scrapedData.price || "0.00",
                image: scrapedData.image,
                description: scrapedData.description
            });
            setSuccessMsg("Product successfully added to store!");
        }

        setScrapedData(null);
        setUrl('');
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleAutoFill = () => {
        const viralBatch = VIRAL_PRODUCTS.map((item, idx) => ({
            id: `auto-viral-${idx}-${new Date().getTime()}`,
            title: item.title,
            price: item.price,
            image: item.image,
            description: item.description,
            category: item.category
        }));

        addProducts(viralBatch);
        setSuccessMsg(`🚀 Boom! Added ${viralBatch.length} viral products to your store.`);
        setTimeout(() => setSuccessMsg(''), 4000);
    };

    const filteredInventory = products.filter(p =>
        p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        p.category?.toLowerCase().includes(inventorySearch.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: IMPORT TOOLS */}
                    <div className="space-y-8">
                        {/* Auto Fill */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-lg border border-transparent text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-300" fill="currentColor" />
                                    Auto-Stock
                                </h2>
                                <p className="text-blue-100 text-sm mb-4">
                                    Instantly add Top 20 Viral Products.
                                </p>
                                <button
                                    onClick={handleAutoFill}
                                    className="bg-white text-blue-700 text-sm hover:bg-blue-50 font-bold py-2 px-4 rounded-full shadow-lg w-full flex items-center justify-center gap-2"
                                >
                                    <Zap className="w-4 h-4" /> Ejecutar
                                </button>
                            </div>
                        </div>

                        {/* Scraper */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-bold mb-4 dark:text-white">Importar Producto/Cat</h2>
                            <form onSubmit={handleImport} className="relative mb-4">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="block w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white mb-2"
                                    placeholder="Pegar Link de ML/Amazon..."
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-bold rounded-lg text-sm px-4 py-2 flex justify-center"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Escanear'}
                                </button>
                            </form>

                            {/* Preview Area */}
                            <AnimatePresence>
                                {scrapedData && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                        <h3 className="font-bold text-sm mb-2 dark:text-gray-200">
                                            {Array.isArray(scrapedData) ? `Batch: ${scrapedData.length} items` : 'Single Item'}
                                        </h3>
                                        <button
                                            onClick={confirmAdd}
                                            className="w-full py-2 bg-green-600 text-white rounded font-bold text-sm"
                                        >
                                            Confirmar Importación
                                        </button>
                                    </motion.div>
                                )}
                                {successMsg && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600 text-sm font-bold text-center">
                                        {successMsg}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INVENTORY MANAGEMENT */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Inventario Activo ({products.length})</h2>
                            <div className="relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={inventorySearch}
                                    onChange={(e) => setInventorySearch(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredInventory.length === 0 ? (
                                <p className="text-center text-gray-500 py-10">No hay productos. ¡Usa el Auto-Stock!</p>
                            ) : (
                                filteredInventory.map(product => (
                                    <div key={product.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group">
                                        <img src={product.image} className="w-16 h-16 object-cover rounded-lg bg-white" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate">{product.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{product.category || 'Sin Categoría'}</p>
                                            <p className="font-mono text-blue-600 font-bold">${product.price}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="p-2 bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded shadow hover:scale-110 transition-transform"
                                                title="Editar"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('¿Eliminar producto?')) removeProduct(product.id);
                                                }}
                                                className="p-2 bg-white dark:bg-gray-600 text-red-500 rounded shadow hover:scale-110 transition-transform"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {editingProduct && (
                    <EditProductModal
                        product={editingProduct}
                        onClose={() => setEditingProduct(null)}
                        onSave={updateProduct}
                    />
                )}
            </AnimatePresence>

        </main>
    );
}
