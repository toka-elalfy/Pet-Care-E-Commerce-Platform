/// <reference types="vite/client" />
import { products, pets, orders, subscriptions, reminders, type Product, type Pet } from "../data";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Simulate network delay for realistic async loading
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchWithAuth = async (endpoint: string, options: RequestInit & { data?: any } = {}) => {
    const token = localStorage.getItem("access_token");
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    if (options.data) {
        if (options.data instanceof FormData) {
            options.body = options.data;
        } else {
            headers.set("Content-Type", "application/json");
            options.body = JSON.stringify(options.data);
        }
    }
    const credentials = options.credentials || 'include';

    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers, credentials });
    if (!res.ok) {
        let errStr = "Request failed";
        try {
            const errData = await res.json();
            if (Array.isArray(errData) && errData.length > 0) {
                errStr = errData[0].msg || errStr;
            } else if (errData.errors && Array.isArray(errData.errors) && errData.errors.length > 0) {
                errStr = errData.errors[0].msg || errStr;
            } else {
                errStr = errData.message || (typeof errData.err === 'string' ? errData.err : errData.msg) || errStr;
            }
        } catch { }
        throw new Error(errStr);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : {};
};
const capitalize = (s: string) => s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;

const mapBackendProduct = (p: any): Product => {
    let img = p.thumbnail?.url || p.images?.[0]?.url || p.image || "";
    if (img.includes("placehold.co") || img.includes("undefined") || !img.startsWith("http")) {
        img = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
    return {
        id: p._id || p.id,
        name: p.title || p.name || "",
        brand: p.brand || "",
        price: p.price || 0,
        subPrice: p.discountPrice || p.price || 0,
        rating: p.rating || 0,
        reviews: p.reviewsCount || p.reviews || 0,
        image: img,
        tags: p.tags || [],
        petType: (capitalize(p.petType) || "All") as Product["petType"],
        category: (capitalize(p.category) || "All") as Product["category"],
        ageGroup: (capitalize(p.ageGroup) || "All") as Product["ageGroup"],
        size: (capitalize(p.size) || "All") as Product["size"],
        description: p.description || p.shortDescription || ""
    };
};

export const api = {
    user: {
        updateProfile: async (data: any) => fetchWithAuth("/user/profile", { method: "PUT", data }),
        updatePassword: async (data: any) => fetchWithAuth("/user/password", { method: "PUT", data }),
        deleteAccount: async () => fetchWithAuth("/user/account", { method: "DELETE" }),
        addAddress: async (data: any) => fetchWithAuth("/user/addresses", { method: "POST", data }),
        updatePrimaryAddress: async (id: string) => fetchWithAuth(`/user/addresses/${id}/primary`, { method: "PUT" }),
        removeAddress: async (id: string) => fetchWithAuth(`/user/addresses/${id}`, { method: "DELETE" }),
    },
    auth: {
        login: async (data: any) => fetchWithAuth("/auth/login", { method: "POST", data }),
        register: async (data: any) => fetchWithAuth("/auth/register", { method: "POST", data }),
        refresh: async () => fetchWithAuth("/auth/refresh", { method: "POST" }),
        logout: async () => fetchWithAuth("/auth/logout", { method: "POST" }),
        getProfile: async () => fetchWithAuth("/user/profile", { method: "GET" })
    },
    categories: {
        getAll: async (): Promise<string[]> => {
            if (USE_MOCK) {
                await delay(200);
                return ["All", "Food", "Toys", "Health", "Grooming"];
            }
            try {
                const res = await fetchWithAuth("/categories");
                const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
                // Return 'All' by default always, then formatted category names
                const fetched = data.map((c: any) => {
                    const n = c.name || c.title || "";
                    return n.charAt(0).toUpperCase() + n.slice(1); // capitalize First letter
                }).filter(Boolean);
                return ["All", ...fetched];
            } catch (err) {
                console.error("Failed to fetch categories, falling back to basic:", err);
                return ["All", "Food", "Toys", "Health", "Grooming"];
            }
        }
    },
    cart: {
        get: async () => fetchWithAuth('/cart'),
        addToCart: async (productId: string, quantity = 1, purchaseType = "one-time", frequency?: string) =>
            fetchWithAuth('/cart/add', { method: 'POST', data: { productId, quantity, purchaseType, frequency } }),
        addMultiple: async (items: any[]) =>
            fetchWithAuth('/cart/add-multiple', { method: 'POST', data: { items } }),
        removeFromCart: async (productId: string) =>
            fetchWithAuth(`/cart/remove/${productId}`, { method: 'DELETE' }),
        clear: async () => fetchWithAuth('/cart/clear', { method: 'DELETE' }),
    },
    orders: {
        create: async (payload: { shippingAddress: any, paymentMethod: string, items?: any[] }) =>
            fetchWithAuth('/orders', { method: 'POST', data: payload }),
        getAll: async () => {
            const res = await fetchWithAuth('/orders');
            return res.orders || res.data || (Array.isArray(res) ? res : []);
        },
        getById: async (id: string) => fetchWithAuth(`/orders/${id}`),
    },
    products: {
        getAll: async (): Promise<Product[]> => {
            if (USE_MOCK) {
                await delay(400);
                return products;
            }
            try {
                const res = await fetchWithAuth("/products");
                console.log("PRODUCTS RAW RES:", res);
                const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : (res?.products || []));
                if (data.length === 0) {
                    console.error("Warning: Backend returned 0 products. Falling back to default list.");
                    return products;
                }
                return data.map(mapBackendProduct);
            } catch (err) {
                console.error("Products error:", err);
                return products; // Return mock list on crash so the UI never blanks out.
            }
        },
        getById: async (id: string): Promise<Product> => {
            if (USE_MOCK) {
                await delay(300);
                const product = products.find((p) => p.id === id);
                if (!product) throw new Error("Product not found");
                return product;
            }
            try {
                const res = await fetchWithAuth(`/products/${id}`);
                const data = res.data || res;
                return mapBackendProduct(data);
            } catch (err) {
                const product = products.find((p) => p.id === id);
                if (product) return product;
                throw err;
            }
        }
    },
    pets: {
        getAll: async () => {
            const res = await fetchWithAuth("/pets");
            return res.pets || res.data || (Array.isArray(res) ? res : []);
        },
        create: async (data: any) => fetchWithAuth("/pets", { method: "POST", data }),
        update: async (id: string, data: any) => fetchWithAuth(`/pets/${id}`, { method: "PATCH", data }),
        delete: async (id: string) => fetchWithAuth(`/pets/${id}`, { method: "DELETE" }),
        getRecommendations: async (id: string) => fetchWithAuth(`/pets/recommendations/${id}`),
    },

    subscriptions: {
        getAll: async () => {
            const res = await fetchWithAuth("/subscriptions");
            return res.subscriptions || res.data || (Array.isArray(res) ? res : []);
        },
        updateStatus: async (id: string, data: any) => fetchWithAuth(`/subscriptions/${id}/status`, { method: "PUT", data }),
        skipDelivery: async (id: string) => fetchWithAuth(`/subscriptions/${id}/skip`, { method: "PUT" }),
        update: async (id: string, data: any) => fetchWithAuth(`/subscriptions/${id}`, { method: "PUT", data }),
    },
    reminders: {
        getAll: async () => {
            if (USE_MOCK) {
                await delay(300);
                return reminders;
            }
            try {
                const res = await fetchWithAuth("/reminders");
                const data = res.reminders || res.data || (Array.isArray(res) ? res : []);

                if (Array.isArray(data)) return data;

                const list: any[] = [];
                if (Array.isArray(data.upcomingDeliveries)) {
                    data.upcomingDeliveries.forEach((sub: any) => {
                        list.push({
                            id: sub._id || Math.random().toString(),
                            type: 'delivery',
                            urgency: 'medium',
                            product: mapBackendProduct(sub.product),
                            title: 'Subscription arriving soon',
                            left: sub.nextDeliveryDate ? `Ships ${new Date(sub.nextDeliveryDate).toLocaleDateString()}` : 'Arriving soon'
                        });
                    });
                }
                if (Array.isArray(data.runningLow)) {
                    data.runningLow.forEach((prod: any) => {
                        list.push({
                            id: prod._id,
                            type: 'reorder',
                            urgency: 'high',
                            product: mapBackendProduct(prod),
                            title: `${prod.name || prod.title || 'Product'} is running low`,
                            left: 'Reorder soon'
                        });
                    });
                }
                return list;
            } catch (err) {
                console.error("Reminders error:", err);
                return reminders;
            }
        },
    }
};
