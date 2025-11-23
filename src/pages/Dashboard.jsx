import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaSignOutAlt, FaCheckCircle, FaExclamationTriangle, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, resendEmailVerification } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate('/login');
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    await resendEmailVerification();
    setResendLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {user.photoURL ? (
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <FaUser className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user.displayName || 'User'}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaSignOutAlt className="mr-2" />
                )}
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>

        {/* Email Verification Status */}
        {!user.emailVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Email verification required
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Please verify your email address to access all features. Check your inbox for the verification link.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="ml-4 inline-flex items-center px-3 py-2 border border-yellow-300 dark:border-yellow-600 text-sm font-medium rounded-md text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200 dark:hover:bg-yellow-900/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {resendLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-700 dark:border-yellow-300 mr-2"></div>
                ) : null}
                Resend Email
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Account Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Profile Information
              </h2>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div className="flex items-center space-x-3">
                <FaUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.displayName || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Address
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                    {user.emailVerified && (
                      <FaCheckCircle className="h-4 w-4 text-green-500" title="Verified" />
                    )}
                  </div>
                </div>
              </div>

              {user.phoneNumber && (
                <div className="flex items-center space-x-3">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.phoneNumber}
                    </p>
                  </div>
                </div>
              )}

              {user.dateOfBirth && (
                <div className="flex items-center space-x-3">
                  <FaCalendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Date of Birth
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(user.dateOfBirth)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Account Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Account Details
              </h2>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Account Status
                </p>
                <div className="flex items-center mt-1">
                  {user.emailVerified ? (
                    <>
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-yellow-600 dark:text-yellow-400">
                        Unverified
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Sign-in Method
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user.providerData && user.providerData.length > 0
                    ? user.providerData[0].providerId.replace('.com', '').replace('google', 'Google').replace('github', 'GitHub')
                    : 'Email/Password'
                  }
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Member Since
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDate(user.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Last Sign In
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDate(user.lastLoginAt)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaEnvelope className="mr-2" />
                Change Email
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaUser className="mr-2" />
                Change Password
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
