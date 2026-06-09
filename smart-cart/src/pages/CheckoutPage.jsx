import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectCartItems, clearCart } from '../redux/slices/cartSlice';
import CheckoutSummary from '../components/CheckoutSummary';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  if (cartItems.length === 0) {
    return (
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
          actionLink="/"
        />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    toast.success('Order placed successfully! Thank you for shopping with SmartCart.');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review your order and complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Items in Cart</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/cart">
              <Button variant="secondary">Back to Cart</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <CheckoutSummary />
          <div className="mt-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
