import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import Badge from './Badge';
import Button from './Button';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = useCallback(() => {
    if (item.quantity < 10) {
      dispatch(increaseQuantity(item.id));
    } else {
      toast.error('Maximum quantity is 10');
    }
  }, [dispatch, item.id, item.quantity]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  }, [dispatch, item.id, item.quantity]);

  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.name} removed from cart`);
  }, [dispatch, item.id, item.name]);

  const totalPrice = item.price * item.quantity;
  const freeUnits = Math.floor(item.quantity / 3);
  const remainder = item.quantity % 3;
  const neededForNextFree = remainder === 0 ? 0 : 3 - remainder;

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden bg-white border border-gray-100 dark:border-gray-700">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ₹{item.price.toLocaleString()}
            </p>
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
            ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        <div className="mt-2">
          {freeUnits > 0 ? (
            <Badge variant="success" size="sm">
              {freeUnits} free item{freeUnits > 1 ? 's' : ''} (B2G1)
            </Badge>
          ) : item.quantity >= 2 ? (
            <Badge variant="orange" size="sm">
              Add {neededForNextFree} more → get 1 free
            </Badge>
          ) : null}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors text-sm"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={item.quantity >= 10}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors text-sm"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-xs text-amazon-link hover:text-amazon-link-hover transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);
