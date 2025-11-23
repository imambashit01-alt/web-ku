// src/components/FeaturedProducts.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslate } from "../context/TranslateContext";

const FeaturedProducts = ({ products }) => {
  const { addToCart } = useCart();
  const { isDark } = useTheme();
  const { translate } = useTranslate();
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['Shoes', 'Jackets', 'Bags', 'T-Shirts'];

  const getCurrentProducts = () => {
    const category = categories[currentPage - 1];
    return products.filter(p => p.category === category);
  };

  const currentProducts = getCurrentProducts();

  if (!products || products.length === 0) {
    return (
      <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>
            {translate("Featured Collection")}
          </h2>
          <p className={`mt-6 text-gray-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {translate("No products available at the moment.")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-12 ${isDark ? 'text-white' : 'text-black'}`}>
          {translate("Featured Collection")} - {translate(categories[currentPage - 1] || categories[currentPage - 1])}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden backdrop-blur-sm hover:border-gray-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-43">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {product.name || "Unnamed Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description || "No description available."}
                  </p>

                  <span className="text-xl font-semibold text-gray-900">
                    ${product.price?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-black text-white w-full py-2 rounded font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  {translate("Shop Now")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded font-semibold transition-colors duration-300 ${
                currentPage === index + 1
                  ? 'bg-white text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
