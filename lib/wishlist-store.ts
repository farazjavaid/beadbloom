'use client';

import { create } from 'zustand';
import { addToWishlist, getWishlist, removeFromWishlist } from './wishlist-api';

type WishlistState = {
  productIds: number[];
  load: () => Promise<void>;
  toggle: (productId: number) => Promise<void>;
  isWishlisted: (productId: number) => boolean;
};

export const useWishlist = create<WishlistState>((set, get) => ({
  productIds: [],

  load: async () => {
    const items = await getWishlist();
    set({ productIds: items.map((item: any) => item.product.id) });
  },

  toggle: async (productId) => {
    const exists = get().productIds.includes(productId);

    if (exists) {
      await removeFromWishlist(productId);
      set({ productIds: get().productIds.filter((id) => id !== productId) });
    } else {
      await addToWishlist(productId);
      set({ productIds: [...get().productIds, productId] });
    }
  },

  isWishlisted: (productId) => get().productIds.includes(productId),
}));