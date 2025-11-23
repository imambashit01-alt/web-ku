import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EmailVerification = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.emailVerified) {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;

    setResendLoading(true);
    try {
      await user.sendEmailVerification();
      toast.success('Verification email sent! Check your inbox.');
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      toast.error('Failed to send verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto h-24 w-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center"
          >
            <FaEnvelope className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            We've sent a verification link to{' '}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {user.email}
            </span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
        >
          <div className="space-y-6">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Email verification required
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please check your email and click the verification link to complete your registration.
                You won't be able to access your account until your email is verified.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={resendLoading || resendCooldown > 0}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {resendLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : null}
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : 'Resend verification email'
                }
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Sign in with different account
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading || resendCooldown > 0}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium disabled:opacity-50"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link
            to="/support"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Need help? Contact support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
