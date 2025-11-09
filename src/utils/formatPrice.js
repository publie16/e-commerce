export default function formatPrice(n) {
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}


