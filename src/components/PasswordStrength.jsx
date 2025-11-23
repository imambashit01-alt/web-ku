import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PasswordStrength = ({ password }) => {
  const requirements = [
    { label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
  ];

  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: 'bg-gray-200' };

    const passed = requirements.filter(req => req.test(password)).length;

    if (passed <= 2) return { level: 1, label: 'Weak', color: 'bg-red-500' };
    if (passed <= 3) return { level: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (passed <= 4) return { level: 3, label: 'Good', color: 'bg-blue-500' };
    return { level: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getStrength();

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Meter */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.level / 4) * 100}%` }}
          ></div>
        </div>
        <span className={`text-xs font-medium ${strength.level === 0 ? 'text-gray-400' : strength.level === 1 ? 'text-red-500' : strength.level === 2 ? 'text-yellow-500' : strength.level === 3 ? 'text-blue-500' : 'text-green-500'}`}>
          {strength.label}
        </span>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <div key={index} className="flex items-center space-x-2 text-xs">
              {passed ? (
                <FaCheck className="text-green-500 w-3 h-3" />
              ) : (
                <FaTimes className="text-red-500 w-3 h-3" />
              )}
              <span className={passed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrength;
