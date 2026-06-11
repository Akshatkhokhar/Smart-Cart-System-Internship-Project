import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectCartItems, clearCart } from '../redux/slices/cartSlice';
import { selectIsAuthenticated } from '../redux/slices/authSlice';
import CheckoutSummary from '../components/CheckoutSummary';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/checkout' } }, replace: true });
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon={
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Nothing to checkout"
            description="Your cart is empty. Add some products before checking out."
            actionLabel="Browse Products"
            actionLink="/products"
          />
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    toast.success('Order placed successfully! Thank you for shopping with SmartCart.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Items in Cart</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-contain bg-white p-1 border border-gray-100 dark:border-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/cart">
                <Button variant="secondary" size="sm">&larr; Back to Cart</Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" size="sm">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <CheckoutSummary />
            <Button
              variant="cta"
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Your Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
