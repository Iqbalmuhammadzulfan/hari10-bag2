// utils/utils.js

// Format angka dengan koma atau titik pemisah ribuan
export const numberWithCommas = (x) => {
  if (!x && x !== 0) return "0"; // handle null / undefined
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
