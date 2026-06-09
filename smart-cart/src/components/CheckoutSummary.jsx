import { memo, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../redux/slices/cartSlice';
import { selectCartDiscountEnabled, toggleCartDiscount } from '../redux/slices/uiSlice';
import { calculateTotals } from '../utils/discounts';
import Badge from './Badge';
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h2>

      <div className="space-y-3">
        {totals.itemsWithProductDiscounts.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-sm">
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 dark:text-white truncate">{item.name}</p>
              <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
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
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">₹{totals.subtotal.toLocaleString()}</span>
        </div>

        {totals.productDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              Product Discount (10% on 3+ units)
              <Badge variant="success" size="sm">SAVING</Badge>
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              -₹{totals.productDiscount.toLocaleString()}
            </span>
          </div>
        )}

        {totals.cartDiscountEligible && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Cart Discount (5% over ₹5000)</span>
            </div>
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
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              Cart Discount (5% over ₹5000)
              <Badge variant="success" size="sm">ACTIVE</Badge>
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              -₹{totals.cartDiscount.toLocaleString()}
            </span>
          </div>
        )}

        {totals.b2g1Discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
              Buy 2 Get 1 Free
              <Badge variant="warning" size="sm">BEST OFFER</Badge>
            </span>
            <span className="text-orange-600 dark:text-orange-400 font-medium">
              -₹{totals.b2g1Discount.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {totals.totalSavings > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total Savings</span>
          <span className="text-green-600 dark:text-green-400 font-bold">
            ₹{totals.totalSavings.toLocaleString()}
          </span>
        </div>
      )}

      <div className="flex justify-between text-lg">
        <span className="font-bold text-gray-900 dark:text-white">Final Amount</span>
        <span className="font-bold text-primary-600 dark:text-primary-400">
          ₹{Math.round(totals.finalAmount).toLocaleString()}
        </span>
      </div>

      {totals.totalSavings > 0 && (
        <p className="text-xs text-center text-green-600 dark:text-green-400">
          You're saving ₹{totals.totalSavings.toLocaleString()} on this order! 🎉
        </p>
      )}
    </div>
  );
}

export default memo(CheckoutSummary);
