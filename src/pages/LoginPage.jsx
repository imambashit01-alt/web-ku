import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialIcon from '../components/SocialIcon';
import TypewriterText from '../components/TypewriterText';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({
    form: false,
    github: false,
    instagram: false,
    tiktok: false
  });
  const [errors, setErrors] = useState({});

  const { loginWithEmail, loginWithGoogle, loginWithGitHub } = useAuth();
  const navigate = useNavigate();

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(prev => ({ ...prev, form: true }));
    try {
      const result = await loginWithEmail(formData.email, formData.password, formData.rememberMe);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(prev => ({ ...prev, form: false }));
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(prev => ({ ...prev, [provider]: true }));
    try {
      let result;
      if (provider === 'github') {
        result = await loginWithGitHub();
      } else if (provider === 'google') {
        result = await loginWithGoogle();
      }
      if (result?.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/5 dark:bg-black/5"></div>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="relative z-10 flex justify-between items-center p-6"
      >
        <Link to="/" className="text-2xl font-bold text-white hover:text-red-400 transition-colors">
          MAMZ
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-red-400 transition-colors">Home</Link>
          <Link to="/women" className="text-white hover:text-red-400 transition-colors">Women</Link>
          <Link to="/men" className="text-white hover:text-red-400 transition-colors">Men</Link>
          <Link to="/kids" className="text-white hover:text-red-400 transition-colors">Kids</Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: "easeOut"
          }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: "easeOut"
            }}
            className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
              className="text-3xl font-bold text-center text-white mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
              className="text-center text-gray-300 mb-8"
            >
              Sign in to your MAMZ account
            </motion.p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.7 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2 accent-red-500"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
                type="submit"
                disabled={loading.form}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                {loading.form ? 'Signing In...' : 'Sign In'}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.9 }}
              className="flex items-center my-6"
            >
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-3 text-sm text-gray-400">or continue with</span>
              <div className="flex-1 border-t border-white/20"></div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.0 }}
              className="flex justify-center space-x-4 mb-6"
            >
              <SocialIcon
                type="github"
                onClick={() => handleSocialLogin('github')}
                disabled={loading.github}
              />
              <SocialIcon
                type="instagram"
                onClick={() => handleSocialLogin('instagram')}
                disabled={loading.instagram}
              />
              <SocialIcon
                type="tiktok"
                onClick={() => handleSocialLogin('tiktok')}
                disabled={loading.tiktok}
              />
            </motion.div>

            {/* Typewriter Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.1 }}
              className="text-center mb-6"
            >
              <TypewriterText
                text="ww.mamz.com"
                speed={60}
                loop={true}
                pause={3000}
              />
            </motion.div>

            {/* Sign Up Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.2 }}
              className="text-center text-gray-300"
            >
              Don't have an account?{' '}
              <Link to="/register" className="text-red-400 hover:text-red-300 transition-colors font-semibold">
                Sign up
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.4 }}
        className="relative z-10 text-center py-6 text-gray-400 text-sm"
      >
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/support" className="hover:text-white transition-colors">Support</Link>
        </div>
        <p>&copy; 2024 MAMZ. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default LoginPage;
 