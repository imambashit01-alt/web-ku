import { motion } from 'framer-motion';

const DiscountTag = ({ discount }) => {
  if (discount === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute top-2 right-2 bg-mamz-red text-white px-2 py-1 rounded-full text-xs font-bold z-10"
    >
      -{discount}% OFF
    </motion.div>
  );
};

export default DiscountTag;
