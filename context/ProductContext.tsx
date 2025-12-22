
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
    description: string;
    category?: string;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    addProducts: (products: Product[]) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    removeProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const SEED_PRODUCTS: Product[] = [
    {
        id: "seed-1",
        title: "Ultra Series 8 Smart Watch - Waterproof, Heart Rate Monitor",
        price: "24.99",
        image: "https://sc04.alicdn.com/kf/H832267bb851249cb9893e4g3d82a3e54p.jpg",
        description: "The ultimate companion for your fitness journey. Tracks heart rate, sleep, and steps with precision. IP68 Waterproof and 7-day battery life.",
        category: "Electronics"
    },
    {
        id: "seed-2",
        title: "15W Fast Wireless Charging Stand - 3-in-1 Magnetic Foldable",
        price: "18.50",
        image: "https://sc04.alicdn.com/kf/H04464d18086241a89c937d046944f374S.jpg",
        description: "Charge your Phone, Watch, and Earbuds simultaneously. Sleek foldable design perfect for travel and organized desks.",
        category: "Electronics"
    },
    {
        id: "seed-3",
        title: "Crystal Rain Humidifier & Essential Oil Diffuser",
        price: "12.90",
        image: "https://sc04.alicdn.com/kf/Hb5c4287f394246838890765955685568A.jpg",
        description: "Transform your room's atmosphere with this viral rain cloud humidifier. Features relaxing water drop sounds and color-changing LEDs.",
        category: "Home"
    },
    {
        id: "seed-4",
        title: "Levitating Moon Lamp - 3D Printing Magnetic Floating",
        price: "45.00",
        image: "https://sc04.alicdn.com/kf/HTB1.7.9X.LrK1Rjy1zdq6ynnpXaz.jpg",
        description: "A mesmerizing piece of decor. This moon lamp floats and rotates in mid-air using magnetic levitation. Perfect gift.",
        category: "Home"
    }
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    // Load from local storage or seed
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('store_products');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setProducts(parsed);
                    } else {
                        setProducts(SEED_PRODUCTS);
                    }
                } catch (e) {
                    setProducts(SEED_PRODUCTS);
                }
            } else {
                setProducts(SEED_PRODUCTS);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('store_products', JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (newProduct: Product) => {
        setProducts(prev => {
            if (prev.find(p => p.id === newProduct.id)) return prev;
            return [newProduct, ...prev];
        });
    };

    const addProducts = (newProducts: Product[]) => {
        setProducts(prev => {
            const uniqueNew = newProducts.filter(np => !prev.find(p => p.id === np.id));
            return [...uniqueNew, ...prev];
        });
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const removeProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, addProducts, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
