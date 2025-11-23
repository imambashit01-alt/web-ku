import { motion } from 'framer-motion';
import { useState } from 'react';

const SizeGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('shoes');

  const sizeData = {
    shoes: {
      title: 'Footwear Size Guide',
      description: 'Measure your foot length for the most accurate fit. Place your foot on a piece of paper and mark the heel and toe points.',
      sizes: [
        { size: 'US 6', eu: '39', uk: '5.5', cm: '24.5' },
        { size: 'US 7', eu: '40', uk: '6.5', cm: '25.5' },
        { size: 'US 8', eu: '41', uk: '7.5', cm: '26.5' },
        { size: 'US 9', eu: '42', uk: '8.5', cm: '27.5' },
        { size: 'US 10', eu: '43', uk: '9.5', cm: '28.5' },
        { size: 'US 11', eu: '44', uk: '10.5', cm: '29.5' },
        { size: 'US 12', eu: '45', uk: '11.5', cm: '30.5' }
      ]
    },
    clothing: {
      title: 'Clothing Size Guide',
      description: 'Measure your body for the best fit. Use a flexible tape measure and wear form-fitting clothing.',
      sizes: [
        { size: 'XS', chest: '32-34"', waist: '26-28"', inseam: '30"' },
        { size: 'S', chest: '34-36"', waist: '28-30"', inseam: '31"' },
        { size: 'M', chest: '36-38"', waist: '30-32"', inseam: '32"' },
        { size: 'L', chest: '38-40"', waist: '32-34"', inseam: '33"' },
        { size: 'XL', chest: '40-42"', waist: '34-36"', inseam: '34"' },
        { size: 'XXL', chest: '42-44"', waist: '36-38"', inseam: '35"' }
      ]
    }
  };

  const categories = [
    { id: 'shoes', name: 'Shoes', icon: '👟' },
    { id: 'clothing', name: 'Clothing', icon: '👕' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-mamz-white dark:bg-mamz-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            Size Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find your perfect fit with our comprehensive size guide
          </p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-md font-semibold transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-mamz-red text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Size Guide Content */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-4">
              {sizeData[selectedCategory].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {sizeData[selectedCategory].description}
            </p>

            {/* Size Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <thead className="bg-mamz-red text-white">
                  <tr>
                    {selectedCategory === 'shoes' ? (
                      <>
                        <th className="px-6 py-4 text-left font-bold">US Size</th>
                        <th className="px-6 py-4 text-left font-bold">EU Size</th>
                        <th className="px-6 py-4 text-left font-bold">UK Size</th>
                        <th className="px-6 py-4 text-left font-bold">Foot Length (cm)</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-left font-bold">Size</th>
                        <th className="px-6 py-4 text-left font-bold">Chest</th>
                        <th className="px-6 py-4 text-left font-bold">Waist</th>
                        <th className="px-6 py-4 text-left font-bold">Inseam</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sizeData[selectedCategory].sizes.map((size, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      {selectedCategory === 'shoes' ? (
                        <>
                          <td className="px-6 py-4 font-semibold text-mamz-black dark:text-mamz-white">
                            {size.size}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.eu}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.uk}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.cm}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-semibold text-mamz-black dark:text-mamz-white">
                            {size.size}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.chest}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.waist}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {size.inseam}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-mamz-red text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">How to Measure</h3>
              <div className="space-y-3 text-sm">
                {selectedCategory === 'shoes' ? (
                  <>
                    <p><strong>Foot Length:</strong> Measure from heel to longest toe</p>
                    <p><strong>Foot Width:</strong> Measure across the widest part of your foot</p>
                    <p><strong>Tip:</strong> Measure both feet and use the larger measurement</p>
                  </>
                ) : (
                  <>
                    <p><strong>Chest:</strong> Measure around the fullest part of your chest</p>
                    <p><strong>Waist:</strong> Measure around your natural waistline</p>
                    <p><strong>Inseam:</strong> Measure from crotch to ankle</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-mamz-black dark:text-mamz-white mb-4">
                Fit Tips
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300 text-sm">
                <p>• MAMZ shoes run true to size</p>
                <p>• If between sizes, size up for comfort</p>
                <p>• Our clothing has a relaxed fit</p>
                <p>• Check product reviews for fit feedback</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SizeGuide;
