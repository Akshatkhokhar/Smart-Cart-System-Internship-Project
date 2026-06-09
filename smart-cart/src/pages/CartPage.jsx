import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../redux/slices/cartSlice';
import { calculateTotals } from '../utils/discounts';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

function CartPage() {
  const cartItems = useSelector(selectCartItems);

  const { subtotal, totalSavings, productDiscount, b2g1Discount } = useMemo(
    () => calculateTotals(cartItems, false),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="text-6xl mb-6 text-gray-200 dark:text-gray-600">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is empty</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="cta" size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/checkout">
            <Button variant="cta" size="md">Proceed to Checkout</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 space-y-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</h3>

              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{subtotal.toLocaleString()}
              </p>

              {productDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400">Product Discount</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">-₹{productDiscount.toLocaleString()}</span>
                </div>
              )}

              {b2g1Discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600 dark:text-amber-400">B2G1 Free</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">-₹{b2g1Discount.toLocaleString()}</span>
                </div>
              )}

              {totalSavings > 0 && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded px-3 py-2 text-center">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    You're saving ₹{totalSavings.toLocaleString()}!
                  </p>
                </div>
              )}

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex flex-col gap-2">
                <Link to="/checkout">
                  <Button variant="cta" size="md" className="w-full">Proceed to Checkout</Button>
                </Link>
                <Link to="/products">
                  <Button variant="secondary" size="sm" className="w-full">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
