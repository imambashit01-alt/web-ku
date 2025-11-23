// Validation utilities for checkout forms
import * as Yup from 'yup';

// Luhn algorithm for credit card validation
export const luhnCheck = (cardNumber) => {
  const digits = cardNumber.replace(/\s/g, '').split('').reverse();
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i], 10);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
};

// Card type detection
export const getCardType = (cardNumber) => {
  const number = cardNumber.replace(/\s/g, '');

  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard';
  if (/^3[47]/.test(number)) return 'amex';
  if (/^6(?:011|5)/.test(number)) return 'discover';

  return 'unknown';
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

// Format expiry date
export const formatExpiry = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  return v;
};

// Validation schemas
export const shippingSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
    .required('Phone number is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),

  zipCode: Yup.string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid ZIP code')
    .required('ZIP code is required'),

  country: Yup.string()
    .required('Country is required'),
});

export const paymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .test('luhn', 'Invalid card number', (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\s/g, '');
      return cleanNumber.length >= 13 && cleanNumber.length <= 19 && luhnCheck(cleanNumber);
    })
    .required('Card number is required'),

  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date')
    .test('future-date', 'Card has expired', (value) => {
      if (!value) return false;
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      now.setMonth(now.getMonth() - 1); // Allow current month
      return expiry > now;
    })
    .required('Expiry date is required'),

  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
    .required('CVV is required'),

  cardholderName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Cardholder name is required'),
});

export const promoSchema = Yup.object().shape({
  promoCode: Yup.string()
    .min(3, 'Promo code must be at least 3 characters')
    .matches(/^[A-Z0-9]+$/i, 'Invalid promo code format'),
});

// Utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode) => {
  const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return zipRegex.test(zipCode);
};

// Auto-format functions
export const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  if (phoneNumber.length <= 3) return phoneNumber;
  if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const formatZipCode = (value) => {
  const zip = value.replace(/[^\d]/g, '');
  if (zip.length <= 5) return zip;
  return `${zip.slice(0, 5)}-${zip.slice(5, 9)}`;
};
