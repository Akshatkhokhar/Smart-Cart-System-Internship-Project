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
    <div className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 card-hover animate-fade-in">
      <div className="relative overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock <= 5 && (
          <div className="absolute top-2 left-2">
            <Badge variant="deal">-{Math.floor((1 - product.stock / 10) * 100)}%</Badge>
          </div>
        )}
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug min-h-[2.5rem] font-sans">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={i < 4 ? '#FF9900' : '#d5d9dd'}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="text-xs text-amazon-link ml-1">({Math.floor(Math.random() * 1000) + 10})</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 align-baseline">₹</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString()}
          </span>
        </div>

        <p className={`text-xs ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="pt-1">
          <Button
            variant={product.stock > 5 ? 'primary' : 'cta'}
            size="sm"
            className="w-full text-xs !rounded-md"
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
