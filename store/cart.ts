import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product: Product, quantity: number = 1) => {
                const existingProduct = get().cart.find((item) => item.id === product.id);
                if (existingProduct) {
                    set({
                        cart: get().cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity } // Add the specified quantity
                                : item
                        ),
                    });
                } else {
                    set({
                        cart: [
                            ...get().cart,
                            { id: product.id, title: product.title, image: product.image, price: product.price, quantity },
                        ],
                    });
                }
            },


            removeFromCart: (id: string) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },

            updateQuantity: (id: string, quantity: number) => {
                set({
                    cart: get().cart.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => {
                set({ cart: [] });
            },

            getTotal: () =>
                get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: "cart-storage", // Name for localStorage key
        }
    )
);

export default useCartStore;
