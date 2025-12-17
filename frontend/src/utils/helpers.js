// src/utils/helpers.js
export const formatPrice = (amount) => {
    if (!amount && amount !== 0) return "";
    return `₹${Number(amount).toFixed(2)}`;
  };
  