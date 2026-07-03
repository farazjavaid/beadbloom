export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products/`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.short_description || p.description,
    price: Number(p.final_price || p.price),
    category: p.category?.slug,
    image: p.main_image || '/images/cover1.jpg',
    badge: p.badge || undefined,
  }));
}