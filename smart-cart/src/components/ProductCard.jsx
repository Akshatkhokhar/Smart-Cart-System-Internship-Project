import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import Badge from './Badge';
import Button from './Button';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  }, [dispatch, product]);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 5 && (
          <div className="absolute top-2 right-2">
            <Badge variant="warning" size="sm">Only {product.stock} left</Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.stock} in stock
          </span>
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
