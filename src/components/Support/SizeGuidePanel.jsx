import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

const SizeGuidePanel = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('tops');

  const sizeData = {
    tops: {
      title: 'Tops & T-Shirts',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      measurements: {
        chest: ['32-34"', '34-36"', '36-38"', '38-40"', '40-42"', '42-44"'],
        waist: ['28-30"', '30-32"', '32-34"', '34-36"', '36-38"', '38-40"'],
        length: ['26"', '27"', '28"', '29"', '30"', '31"']
      }
    },
    bottoms: {
      title: 'Bottoms & Pants',
      sizes: ['28', '30', '32', '34', '36', '38'],
      measurements: {
        waist: ['28"', '30"', '32"', '34"', '36"', '38"'],
        inseam: ['30"', '31"', '32"', '32"', '33"', '33"'],
        outseam: ['40"', '41"', '42"', '42"', '43"', '43"']
      }
    },
    shoes: {
      title: 'Shoes',
      sizes: ['7', '8', '9', '10', '11', '12'],
      measurements: {
        us: ['7', '8', '9', '10', '11', '12'],
        uk: ['6', '7', '8', '9', '10', '11'],
        eu: ['40', '41', '42', '43', '44', '45'],
        cm: ['25.5', '26.5', '27.5', '28.5', '29.5', '30.5']
      }
    }
  };

  const categories = [
    { id: 'tops', label: 'Tops', icon: '👕' },
    { id: 'bottoms', label: 'Bottoms', icon: '👖' },
    { id: 'shoes', label: 'Shoes', icon: '👟' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Ruler className="text-red-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Size Chart */}
              <div className="overflow-x-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {sizeData[selectedCategory].title}
                </h3>

                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Size
                      </th>
                      {Object.keys(sizeData[selectedCategory].measurements).map((measurement) => (
                        <th key={measurement} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900 capitalize">
                          {measurement}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData[selectedCategory].sizes.map((size, index) => (
                      <tr key={size} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                          {size}
                        </td>
                        {Object.values(sizeData[selectedCategory].measurements).map((measurements, i) => (
                          <td key={i} className="border border-gray-300 px-4 py-3 text-gray-700">
                            {measurements[index]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to Measure */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">How to Measure</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
                  </div>
                  <div>
                    <strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.
                  </div>
                  <div>
                    <strong>Inseam:</strong> Measure from the crotch seam to the bottom of the leg.
                  </div>
                  <div>
                    <strong>Foot Length:</strong> Measure from heel to toe while standing.
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Not sure about your size? <a href="/contact" className="text-red-500 hover:text-red-600 font-medium">Contact us</a> for personalized assistance.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeGuidePanel;
