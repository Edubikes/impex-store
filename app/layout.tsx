
import "./globals.css";
import React from "react";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { CartSidebar } from "@/components/CartSidebar";

export const metadata = {
  title: "IMPEX | Automate Your Global Dropshipping Business",
  description: "Start your dropshipping business today. Import products from Alibaba, AliExpress, and Temu with one click. Automatic currency conversion and instant checkout.",
  keywords: ["dropshipping", "alibaba", "automation", "ecommerce", "import", "business"],
  openGraph: {
    title: "IMPEX | Global Dropshipping Automation",
    description: "Import products from Alibaba directly to your store. Start currently.",
    url: "https://impex.store",
    siteName: "IMPEX",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556740758-90de29b97195?q=80&w=1200", // Placeholder premium image
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <CurrencyProvider>
            <CartProvider>
              {children}
              <CartSidebar />
            </CartProvider>
          </CurrencyProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
