export type Category = 'necklaces' | 'bracelets' | 'earrings' | 'phonecharms';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  badge?: 'new' | 'bestseller' | 'limited';
};

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All Pieces' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'phonecharms', label: 'Phone Charms' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Elegant Beads Necklace',
    description: 'Hand-strung pearls with a soft rosé glow.',
    price: 1000,
    category: 'necklaces',
    image: '/images/Necklace/1.jpg',
    badge: 'bestseller',
  },
  {
    id: 2,
    name: 'Colorful Beads Bracelet',
    description: 'Playful palette, smooth glass beads.',
    price: 500,
    category: 'bracelets',
    image: '/images/Bracelets/1.jpg',
  },
  {
    id: 3,
    name: 'Beaded Phone Charm',
    description: 'A pop of joy clipped to your phone.',
    price: 1000,
    category: 'phonecharms',
    image: '/images/PhoneCharms/1.jpg',
    badge: 'new',
  },
  {
    id: 4,
    name: 'Designer Beads Necklace',
    description: 'Statement piece for the bold ones.',
    price: 1200,
    category: 'necklaces',
    image: '/images/Necklace/2.jpg',
  },
  {
    id: 5,
    name: 'Crystal Beads Bracelet',
    description: 'Faceted crystal beads, light catcher.',
    price: 650,
    category: 'bracelets',
    image: '/images/Bracelets/2.jpg',
  },
  {
    id: 6,
    name: 'Elegant Beads Earrings',
    description: 'Featherlight, all-day wear.',
    price: 400,
    category: 'earrings',
    image: '/images/Earings/1.jpg',
  },
  {
    id: 7,
    name: 'Premium Beads Bracelet',
    description: 'Premium materials, refined finish.',
    price: 750,
    category: 'bracelets',
    image: '/images/Bracelets/3.jpg',
  },
  {
    id: 8,
    name: 'Floral Phone Charm',
    description: 'Tiny garden for your screen.',
    price: 1200,
    category: 'phonecharms',
    image: '/images/PhoneCharms/2.jpg',
  },
  {
    id: 9,
    name: 'Elegant Phone Charm',
    description: 'Subtle elegance, everyday companion.',
    price: 1500,
    category: 'phonecharms',
    image: '/images/PhoneCharms/3.jpg',
  },
  {
    id: 10,
    name: 'Classic Beads Bracelet',
    description: 'Timeless silhouette, modern beads.',
    price: 850,
    category: 'bracelets',
    image: '/images/Bracelets/bracelets1.jpg',
  },
  {
    id: 11,
    name: 'Luxury Beads Bracelet',
    description: 'Curated luxe, soft to the wrist.',
    price: 900,
    category: 'bracelets',
    image: '/images/Bracelets/bracelets2.jpg',
    badge: 'limited',
  },
  {
    id: 12,
    name: 'Trendy Phone Charm',
    description: 'On-trend colorways, statement vibe.',
    price: 1800,
    category: 'phonecharms',
    image: '/images/PhoneCharms/4.jpg',
  },
  {
    id: 13,
    name: 'Designer Beads Bracelet',
    description: 'Designer cut beads, hand-knotted.',
    price: 950,
    category: 'bracelets',
    image: '/images/Bracelets/bracelets3.jpg',
  },
  {
    id: 14,
    name: 'Artisan Beads Bracelet',
    description: 'One-of-a-kind, made slow.',
    price: 1000,
    category: 'bracelets',
    image: '/images/Bracelets/bracelets4.jpg',
  },
  {
    id: 15,
    name: 'Designer Beads Earrings',
    description: 'Modern silhouettes, gentle weight.',
    price: 500,
    category: 'earrings',
    image: '/images/Earings/2.jpg',
  },
  {
    id: 16,
    name: 'Premium Beads Earrings',
    description: 'Premium beads, refined drops.',
    price: 600,
    category: 'earrings',
    image: '/images/Earings/3.jpg',
  },
  {
    id: 17,
    name: 'Luxury Beads Earrings',
    description: 'Luxurious finish, rich palette.',
    price: 700,
    category: 'earrings',
    image: '/images/Earings/4.jpg',
    badge: 'bestseller',
  },
  {
    id: 18,
    name: 'Premium Beads Necklace',
    description: 'Premium length, premium feel.',
    price: 1400,
    category: 'necklaces',
    image: '/images/Necklace/3.jpg',
  },
  {
    id: 19,
    name: 'Luxury Beads Necklace',
    description: 'A keepsake — wear it everywhere.',
    price: 1500,
    category: 'necklaces',
    image: '/images/Necklace/4.jpg',
    badge: 'limited',
  },
];