
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'MXN';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    formatPrice: (priceV: string | number) => string;
    exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('MXN'); // Default to MXN as requested
    const exchangeRate = 20.50; // Hardcoded for demo stability

    const formatPrice = (priceV: string | number) => {
        const val = typeof priceV === 'string' ? parseFloat(priceV) : priceV;
        if (isNaN(val)) return '$0.00';

        if (currency === 'MXN') {
            return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val * exchangeRate);
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRate }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
