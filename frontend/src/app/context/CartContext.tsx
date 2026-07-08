import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { api } from "../api";
import { useAuth } from "./AuthContext";
import { Product } from "../data";

export type CartItem = { id: string; qty: number; sub: boolean; freq?: string; product?: Product };

type CartContextType = {
    cart: CartItem[];
    loadingCart: boolean;
    refreshCart: () => Promise<void>;
    addToCart: (id: string, qty?: number, sub?: boolean, freq?: string) => Promise<void>;
    addManyToCart: (ids: string[]) => Promise<void>;
    updateCartItem: (id: string, qty: number, sub?: boolean, freq?: string) => Promise<void>;
    removeFromCart: (id: string) => Promise<void>;
    clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { authed } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loadingCart, setLoadingCart] = useState(true);

    const mapBackendCart = (backendItems: any[]): CartItem[] => {
        return backendItems.map((item: any) => ({
            id: item.product?._id || item.product?.id || item.product,
            qty: item.quantity,
            sub: item.purchaseType === "subscription",
            freq: item.frequency,
            product: item.product?.title ? { // Convert backend populated product manually
                id: item.product._id,
                name: item.product.title,
                price: item.product.price,
                subPrice: item.product.discountPrice || item.product.price,
                image: item.product.images?.[0]?.url || item.product.thumbnail?.url || "",
                brand: item.product.brand || "",
                rating: item.product.rating || 0,
                reviews: item.product.reviewsCount || 0,
                tags: [],
                category: "All",
                ageGroup: "All",
                petType: "All",
                size: "All",
                description: ""
            } : item.product // If it comes natively or mock, just use it
        }));
    };

    const refreshCart = useCallback(async () => {
        if (!authed) {
            setCart([]);
            setLoadingCart(false);
            return;
        }
        try {
            setLoadingCart(true);
            const res = await api.cart.get();
            const cartData = res.cart || res.data || res;
            setCart(cartData.items ? mapBackendCart(cartData.items) : []);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setCart([]);
        } finally {
            setLoadingCart(false);
        }
    }, [authed]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (id: string, qty = 1, sub = false, freq?: string) => {
        if (!authed) {
            toast.error("Please log in to add to cart");
            window.location.href = "/login";
            return;
        }
        toast.promise(
            api.cart.addToCart(id, qty, sub ? "subscription" : "one-time", freq).then(refreshCart),
            {
                loading: "Adding to cart...",
                success: "Added to cart!",
                error: "Failed to add to cart"
            }
        );
    };

    const addManyToCart = async (ids: string[]) => {
        if (!authed) {
            toast.error("Please log in to add to cart");
            window.location.href = "/login";
            return;
        }
        const items = ids.map(id => ({ productId: id, quantity: 1, purchaseType: "one-time" }));
        toast.promise(
            api.cart.addMultiple(items).then(refreshCart),
            {
                loading: "Adding bundle to cart...",
                success: "Bundle added to cart!",
                error: "Failed to add bundle"
            }
        );
    };

    const updateCartItem = async (id: string, newQty: number, sub = false, freq?: string) => {
        if (newQty <= 0) return removeFromCart(id);

        const existing = cart.find(x => x.id === id);
        if (!existing) return;

        const delta = newQty - existing.qty;
        if (delta !== 0) {
            await api.cart.addToCart(id, delta, sub ? "subscription" : "one-time", freq);
            await refreshCart();
        } else if (existing.sub !== sub) {
            // Since exact patch update isn't available, we would remove and re-add to change sub status
            await api.cart.removeFromCart(id);
            await api.cart.addToCart(id, newQty, sub ? "subscription" : "one-time", freq);
            await refreshCart();
        }
    };

    const removeFromCart = async (id: string) => {
        try {
            await api.cart.removeFromCart(id);
            await refreshCart();
            toast.success("Item removed");
        } catch (e) {
            toast.error("Failed to remove item");
        }
    };

    const clearCart = async () => {
        try {
            await api.cart.clear();
            await refreshCart();
        } catch { }
    }

    return (
        <CartContext.Provider value={{ cart, loadingCart, refreshCart, addToCart, addManyToCart, updateCartItem, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCartContext must be used within CartProvider");
    return ctx;
}
