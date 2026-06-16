// Mock Product Service
// Exposes data for VK Stich Studio's premium collections. Easily customizable with real backend queries.

const DELAY = 400; // Fast simulation for local gallery browsing

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Classic Three-Piece Royal Suit',
    price: 18999,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7',
    description: 'Bespoke tailoring at its finest. Made of premium Italian wool with a custom lining, structured shoulders, and flat-front trousers.',
    rating: 4.9,
    reviews: 24,
    sizes: ['Standard M', 'Standard L', 'Standard XL', 'Custom Fit (Requires Booking)']
  },
  {
    id: 'p2',
    name: 'Elegant Crimson Bridal Lehenga',
    price: 45000,
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    description: 'Detailed hand embroidery on raw silk, complete with custom designer blouse, silk dupatta, and adjustable waist tie.',
    rating: 5.0,
    reviews: 12,
    sizes: ['Standard S', 'Standard M', 'Custom Fit (Requires Booking)']
  },
  {
    id: 'p3',
    name: 'Classic Velvet Blazer',
    price: 12500,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc',
    description: 'Rich velvet double-breasted blazer with satin peak lapels. Perfect for formal evenings and receptions.',
    rating: 4.8,
    reviews: 31,
    sizes: ['Standard S', 'Standard M', 'Standard L', 'Custom Fit (Requires Booking)']
  },
  {
    id: 'p4',
    name: 'Ivory Designer Wedding Gown',
    price: 38000,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de',
    description: 'Exquisite lace detail bodice with a flowing satin skirt and long train. Made to order with custom fitting consultations.',
    rating: 4.9,
    reviews: 18,
    sizes: ['Standard S', 'Standard M', 'Standard L', 'Custom Fit (Requires Booking)']
  },
  {
    id: 'p5',
    name: 'Handcrafted Sherwani with Zardozi Work',
    price: 28999,
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1597983073492-bc24018b47f8?auto=format&fit=crop&q=80&w=800',
    description: 'Premium gold-tinted silk Sherwani detailed with heavy Zardozi embroidery, matched with silk churidar pants.',
    rating: 4.7,
    reviews: 15,
    sizes: ['Standard M', 'Standard L', 'Custom Fit (Requires Booking)']
  },
  {
    id: 'p6',
    name: 'Modern Tailored Corporate Jumpsuit',
    price: 7999,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
    description: 'Crepe fabric tapered jumpsuit with mock collar, structural pleating, and customizable belted waist.',
    rating: 4.6,
    reviews: 22,
    sizes: ['Standard S', 'Standard M', 'Standard L', 'Custom Fit (Requires Booking)']
  }
];

export const productService = {
  getProducts: async (category = 'All') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'All') {
          resolve(PRODUCTS);
        } else {
          resolve(PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase()));
        }
      }, DELAY);
    });
  },

  getProductById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, DELAY);
    });
  }
};
