import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';

function CartPage() {
  const cartItems = useSelector(selectCartItems);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Browse our products and find something you love!"
          actionLabel="Browse Products"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Link to="/checkout">
          <Button variant="primary" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total ({itemCount} items)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{subtotal.toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="secondary" size="lg">Continue Shopping</Button>
            </Link>
            <Link to="/checkout">
              <Button variant="primary" size="lg">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
