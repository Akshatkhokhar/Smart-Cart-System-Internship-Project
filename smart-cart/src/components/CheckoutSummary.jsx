import { memo, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../redux/slices/cartSlice';
import { selectCartDiscountEnabled, toggleCartDiscount } from '../redux/slices/uiSlice';
import { calculateTotals } from '../utils/discounts';
import Button from './Button';

function CheckoutSummary() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartDiscountEnabled = useSelector(selectCartDiscountEnabled);

  const totals = useMemo(() => calculateTotals(cartItems, cartDiscountEnabled), [cartItems, cartDiscountEnabled]);

  const handleToggleCartDiscount = useCallback(() => {
    dispatch(toggleCartDiscount());
  }, [dispatch]);

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h2>

      <div className="space-y-2">
        {totals.itemsWithProductDiscounts.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-sm">
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Qty: {item.quantity}</p>
            </div>
            <p className="text-gray-900 dark:text-white font-medium ml-2">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">₹{totals.subtotal.toLocaleString()}</span>
        </div>

        {totals.productDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">Product Discount</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">-₹{totals.productDiscount.toLocaleString()}</span>
          </div>
        )}

        {totals.b2g1Discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-amber-600 dark:text-amber-400">Buy 2 Get 1 Free</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">-₹{totals.b2g1Discount.toLocaleString()}</span>
          </div>
        )}

        {totals.cartDiscountEligible && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Cart Discount (5% over ₹5000)</span>
            <Button
              variant={cartDiscountEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={handleToggleCartDiscount}
            >
              {cartDiscountEnabled ? 'Applied' : 'Apply'}
            </Button>
          </div>
        )}
        {totals.cartDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">Cart Discount</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">-₹{totals.cartDiscount.toLocaleString()}</span>
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="flex justify-between text-base">
        <span className="font-bold text-gray-900 dark:text-white">Final Amount</span>
        <span className="font-bold text-amazon-orange">
          ₹{Math.round(totals.finalAmount).toLocaleString()}
        </span>
      </div>

      {totals.totalSavings > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded px-3 py-2 text-center">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
            You're saving ₹{totals.totalSavings.toLocaleString()} on this order!
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(CheckoutSummary);
