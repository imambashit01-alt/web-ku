export const products = [
  {
    "id": "shoe-1",
    "name": "Urban Runner Pro",
    "price": 120,
    "discount": 15,
    "rating": 4.5,
    "reviews": 128,
    "category": "Shoes",
    "subcategory": "women",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    ],
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    "description": "Sleek running shoes designed for city streets with superior cushioning.",
    "sku": "URP-001",
    "stock": "In Stock",
    "badge": "New Arrival"
  },
  {
    "id": "shoe-2",
    "name": "Casual Sneak Elite",
    "price": 85,
    "discount": 10,
    "rating": 4.2,
    "reviews": 95,
    "category": "Shoes",
    "subcategory": "men",
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop"
    ],
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    "description": "Comfortable everyday sneakers with a modern twist.",
    "sku": "CSE-002",
    "stock": "In Stock"
  },
  {
    "id": "shoe-3",
    "name": "High-Top Streetwear",
    "price": 140,
    "discount": 20,
    "rating": 4.7,
    "reviews": 203,
    "category": "Shoes",
    "subcategory": "kids",
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    ],
    "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    "description": "Bold high-top sneakers for urban fashion enthusiasts.",
    "sku": "HTS-003",
    "stock": "In Stock",
    "badge": "Best Seller"
  },
  {
    "id": "shoe-4",
    "name": "Minimalist Walkers",
    "price": 95,
    "rating": 4.0,
    "reviews": 67,
    "category": "Shoes",
    "subcategory": "women",
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    ],
    "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    "description": "Simple, elegant shoes perfect for casual outings.",
    "sku": "MW-004",
    "stock": "In Stock"
  },
  {
    "id": "shoe-5",
    "name": "Athletic Boost",
    "price": 110,
    "discount": 25,
    "rating": 4.8,
    "reviews": 312,
    "category": "Shoes",
    "subcategory": "men",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    ],
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "description": "Performance-driven sneakers for active lifestyles.",
    "sku": "AB-005",
    "stock": "In Stock",
    "badge": "Trending"
  }
];

export const discountedPrice = (price, discount) => {
  return price - (price * (discount / 100));
};

export const infoPages = {
  contact: {
    title: '📞 Contact Us',
    content: `<h3>Get In Touch</h3><p>Customer Service: 1-800-MAMZ-SHOP</p><p>Email: support@mamz.com</p><p>Live Chat: Available 24/7</p>`
  },
  shipping: {
    title: '🚚 Shipping',
    content: `<h3>Shipping Options</h3><p>Standard: 5-7 days - $10</p><p>Express: 2-3 days - $20</p><p>FREE shipping on orders $50+</p>`
  },
  returns: {
    title: '↩️ Returns',
    content: `<h3>Easy Returns</h3><p>30-day return policy</p><p>Free return shipping</p><p>Full refund guaranteed</p>`
  },
  faq: {
    title: '❓ FAQ',
    content: `<h3>Common Questions</h3><p><strong>How do I track my order?</strong><br>Check your email for tracking info</p><p><strong>What's your return policy?</strong><br>30 days, no questions asked</p>`
  },
  story: {
    title: '📖 Our Story',
    content: `<h3>Off The Wall Since 1966</h3><p>Founded in Southern California, MAMZ has been a pioneer in skateboarding culture and street fashion for over 50 years.</p>`
  },
  careers: {
    title: '💼 Careers',
    content: `<h3>Join Our Team</h3><p>We're always looking for passionate people. Email careers@mamz.com</p>`
  },
  sustainability: {
    title: '🌱 Sustainability',
    content: `<h3>Our Commitment</h3><p>Carbon neutral by 2030</p><p>Sustainable materials</p><p>Recycling program</p>`
  },
  locator: {
    title: '📍 Store Locator',
    content: `<h3>Find a Store</h3><p>Los Angeles, New York, Miami, Chicago, San Francisco</p><p>Visit mamz.com/stores for full list</p>`
  },
  giftcards: {
    title: '🎁 Gift Cards',
    content: `<h3>Perfect Gift</h3><p>Available: $25, $50, $100, $250</p><p>No expiration date</p>`
  },
  student: {
    title: '🎓 Student Discount',
    content: `<h3>15% Off for Students</h3><p>Verify with .edu email</p><p>Valid student ID required</p>`
  }
};
