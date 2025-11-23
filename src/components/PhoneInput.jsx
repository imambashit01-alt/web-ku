import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputComponent = ({ value, onChange, error, className = "" }) => {
  const handleChange = (phone, country) => {
    // phone includes country code, country has country data
    onChange(phone, country);
  };

  return (
    <div className={`phone-input-wrapper ${className}`}>
      <PhoneInput
        country={'us'} // Default country
        value={value}
        onChange={handleChange}
        inputProps={{
          name: 'phone',
          required: true,
        }}
        containerClass={`phone-input-container ${error ? 'error' : ''}`}
        inputClass="phone-input-field"
        buttonClass="phone-input-button"
        dropdownClass="phone-input-dropdown"
        enableSearch={true}
        disableSearchIcon={false}
        countryCodeEditable={false}
        autoFormat={true}
        placeholder="Enter phone number"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      <style jsx>{`
        .phone-input-container {
          width: 100%;
        }

        .phone-input-container.error .phone-input-field {
          border-color: #dc2626;
        }

        .phone-input-field {
          width: 100% !important;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          background-color: #ffffff;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .phone-input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .phone-input-button {
          border: 1px solid #d1d5db;
          border-right: none;
          background-color: #ffffff;
          border-radius: 0.375rem 0 0 0.375rem;
        }

        .phone-input-button:hover {
          background-color: #f9fafb;
        }

        .phone-input-dropdown {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
        }

        .phone-input-container .flag-dropdown {
          border-radius: 0.375rem 0 0 0.375rem;
        }

        .phone-input-container .selected-flag {
          border-radius: 0.375rem 0 0 0.375rem;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .phone-input-field,
          .phone-input-button {
            background-color: #374151;
            border-color: #4b5563;
            color: #ffffff;
          }

          .phone-input-field:focus {
            border-color: #60a5fa;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
          }

          .phone-input-button:hover {
            background-color: #4b5563;
          }

          .phone-input-dropdown {
            background-color: #374151;
            border-color: #4b5563;
          }
        }
      `}</style>
    </div>
  );
};

export default PhoneInputComponent;
