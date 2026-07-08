import { useCallback } from "react";
import { api } from "../api";
import { useAsync } from "./useAsync";

export const useProducts = () => {
    const fetchProducts = useCallback(() => api.products.getAll(), []);
    return useAsync(fetchProducts);
};

export const useCategories = () => {
    const fetchCategories = useCallback(() => api.categories.getAll(), []);
    return useAsync(fetchCategories);
};

export const useProduct = (id: string) => {
    const fetchProduct = useCallback(() => api.products.getById(id), [id]);
    return useAsync(fetchProduct);
};

export const usePets = () => {
    const fetchPets = useCallback(() => api.pets.getAll(), []);
    return useAsync(fetchPets);
};

export const useOrders = () => {
    const fetchOrders = useCallback(() => api.orders.getAll(), []);
    return useAsync(fetchOrders);
};

export const useSubscriptions = () => {
    const fetchSubscriptions = useCallback(() => api.subscriptions.getAll(), []);
    return useAsync(fetchSubscriptions);
};

export const useReminders = () => {
    const fetchReminders = useCallback(() => api.reminders.getAll(), []);
    return useAsync(fetchReminders);
};
