import { API_BASE_URL } from './api';
import { getAccessToken } from './auth-store';

export async function getWishlist() {
  const token = getAccessToken();

  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/api/wishlist/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  return res.json();
}

export async function addToWishlist(productId: number) {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Login required');
  }

  const res = await fetch(`${API_BASE_URL}/api/wishlist/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: productId,
    }),
  });

  if (!res.ok) {
    throw new Error('Could not add to wishlist');
  }

  return res.json();
}

export async function removeFromWishlist(productId: number) {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Login required');
  }

  const res = await fetch(`${API_BASE_URL}/api/wishlist/remove/${productId}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Could not remove from wishlist');
  }

  return res.json();
}