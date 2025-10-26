export type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
};

const KEY = "nt_cart_v1";

function read(): CartItem[] {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        return JSON.parse(raw) as CartItem[];
    } catch (err) {
        console.error("read cart", err);
        return [];
    }
}

function write(items: CartItem[]) {
    try {
        localStorage.setItem(KEY, JSON.stringify(items));
        // emit an update event so UI can react
        const count = items.reduce((s, it) => s + (it.quantity || 0), 0);
        window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count, items } }));
    } catch (err) {
        console.error("write cart", err);
    }
}

export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    return read();
}

export function getCount(): number {
    return getCart().reduce((s, it) => s + (it.quantity || 0), 0);
}

export function addItem(item: { id: string; name: string; price: number; image?: string; quantity?: number }) {
    if (typeof window === "undefined") return;
    const items = read();
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
        existing.quantity = (existing.quantity || 0) + (item.quantity || 1);
    } else {
        items.push({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity || 1 });
    }
    write(items);
}

export function removeItem(id: string) {
    if (typeof window === "undefined") return;
    const items = read().filter((i) => i.id !== id);
    write(items);
}

export function clearCart() {
    if (typeof window === "undefined") return;
    write([]);
}
