import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-xl ${className}`}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        <FaHome className="text-blue-500" size={28} />
      </motion.div>
      <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        HouseHunt
      </span>
    </Link>
  );
};

export default Logo;
