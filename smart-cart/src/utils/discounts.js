export function calculateCartDiscount(totalAfterAll, cartDiscountEnabled) {
  if (cartDiscountEnabled && totalAfterAll > 5000) {
    return totalAfterAll * 0.05;
  }
  return 0;
}

export function calculateBuy2Get1Free(cartItems) {
  let totalB2G1Discount = 0;
  const itemsWithB2G1 = cartItems.map(item => {
    const freeUnits = Math.floor(item.quantity / 3);
    const discount = freeUnits * item.price;
    totalB2G1Discount += discount;
    return { ...item, b2g1Discount: discount, freeUnits };
  });
  return { discount: totalB2G1Discount, items: itemsWithB2G1 };
}

export function calculateTotals(cartItems, cartDiscountEnabled = false) {
  const { discount: b2g1Discount, items: itemsWithB2G1 } = calculateBuy2Get1Free(cartItems);

  const itemsWithProductDiscounts = itemsWithB2G1.map(item => {
    if (item.quantity >= 3 && item.freeUnits === 0) {
      const subtotal = item.price * item.quantity;
      const discount = subtotal * 0.1;
      return { ...item, productDiscount: discount, discountedSubtotal: subtotal - discount };
    }
    return { ...item, productDiscount: 0, discountedSubtotal: item.price * item.quantity };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const productDiscount = itemsWithProductDiscounts.reduce(
    (sum, item) => sum + item.productDiscount, 0
  );
  const totalAfterProductDiscounts = itemsWithProductDiscounts.reduce(
    (sum, item) => sum + item.discountedSubtotal, 0
  );

  let totalAfterAll = totalAfterProductDiscounts - b2g1Discount;
  const cartDiscount = calculateCartDiscount(totalAfterAll, cartDiscountEnabled);

  const finalAmount = totalAfterAll - cartDiscount;
  const totalSavings = productDiscount + cartDiscount + b2g1Discount;

  return {
    subtotal,
    productDiscount,
    cartDiscount,
    b2g1Discount,
    totalSavings,
    finalAmount,
    itemsWithProductDiscounts,
    cartDiscountEligible: totalAfterAll > 5000,
  };
}
