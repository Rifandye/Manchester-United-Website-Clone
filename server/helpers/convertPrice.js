function priceFormat(price) {
  const formattedPrice = new Intl.NumberFormat("en-Gb", {
    style: "currency",
    currency: "GBP",
  });

  return formattedPrice.format(price);
}

module.exports = priceFormat;
