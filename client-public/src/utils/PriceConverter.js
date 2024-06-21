export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
  }).format(price);
}
