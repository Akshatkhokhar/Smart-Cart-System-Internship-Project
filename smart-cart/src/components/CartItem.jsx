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
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-slide-up">
      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Unit Price: ₹{item.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{totalPrice.toLocaleString()}
            </p>
            {item.quantity >= 5 && (
              <Badge variant="warning" size="sm" className="mt-1">
                Bulk Purchase
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-2">
          {freeUnits > 0 ? (
            <Badge variant="success" size="sm">
              🎉 {freeUnits} free{freeUnits > 1 ? ' items' : ' item'} with B2G1!
            </Badge>
          ) : item.quantity >= 2 ? (
            <Badge variant="info" size="sm">
              Add {neededForNextFree} more → get 1 free!
            </Badge>
          ) : null}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="!px-2 !py-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </Button>
            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleIncrease}
              disabled={item.quantity >= 10}
              className="!px-2 !py-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);
