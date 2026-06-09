import { memo, useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../redux/slices/cartSlice';
import { toggleDarkMode } from '../redux/slices/uiSlice';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const handleToggleDark = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart', icon: true },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-shadow duration-300 ${
      scrolled
        ? 'bg-amazon-navy/95 dark:bg-black/95 shadow-lg shadow-black/20'
        : 'bg-amazon-navy dark:bg-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 bg-amazon-orange rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">SmartCart</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive(link.to)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.icon ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="relative">
                      Cart
                      {cartCount > 0 && (
                        <span className="absolute -top-2.5 -right-3 bg-amazon-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[17px] text-center leading-tight animate-fade-in">
                          {cartCount}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="relative">
                    {link.label}
                    {isActive(link.to) && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-amazon-orange rounded-full animate-fade-in" />
                    )}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleDark}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <div className={`transition-transform duration-300 ${darkMode ? 'rotate-12' : '-rotate-12'}`}>
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="sm:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="sm:hidden bg-amazon-dark border-t border-white/10 overflow-hidden animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 animate-fade-in ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Cart
                    {cartCount > 0 && (
                      <span className="bg-amazon-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
