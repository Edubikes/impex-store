
import { useState, useMemo } from 'react';
import { Product } from '@/context/ProductContext';

export function useSearch(products: Product[], query: string) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Simple debounce could be added here, but for <100 items direct filtering is fine.

    const filteredProducts = useMemo(() => {
        if (!query) return products;

        const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const searchTerms = normalize(query).split(' ').filter(t => t.length > 0);

        return products.filter(product => {
            const title = normalize(product.title);
            const category = normalize(product.category || '');
            const desc = normalize(product.description || '');

            // Check if EVERY search term is present in Title OR Category OR Description
            // This allows "Reloj Smart" to match "Smart Watch Reloj..."
            return searchTerms.every(term =>
                title.includes(term) ||
                category.includes(term) ||
                desc.includes(term)
            );
        });
    }, [products, query]);

    return filteredProducts;
}
