import { memo, useCallback, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../redux/slices/cartSlice';
import { toggleDarkMode } from '../redux/slices/uiSlice';
import { selectUser, selectIsAuthenticated, logout } from '../redux/slices/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    const onPointerDown = (e) => {
      if (!e.target.closest('#profile-menu')) setProfileOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [profileOpen]);

  useEffect(() => {
    if (!mobileMenu) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  const handleToggleDark = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    setMobileMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart', icon: true },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-amazon-navy/90 dark:bg-black/90 backdrop-blur-lg shadow-lg shadow-black/10'
        : 'bg-amazon-navy dark:bg-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-amazon-orange to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amazon-orange/25 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SmartCart</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                        <span className="absolute -top-2.5 -right-3 bg-gradient-to-br from-amazon-orange to-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight animate-fade-in shadow-lg shadow-amazon-orange/30">
                          {cartCount}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="relative">
                    {link.label}
                    {isActive(link.to) && (
                      <span className="absolute -bottom-1.5 left-2 right-2 h-0.5 bg-gradient-to-r from-amazon-orange to-orange-400 rounded-full animate-fade-in" />
                    )}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-0.5">
            {isAuthenticated ? (
              <div id="profile-menu" className="hidden md:relative md:flex items-center">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    profileOpen
                      ? 'text-white bg-white/15'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Profile"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 0112 15a9 9 0 017.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-black/10 dark:shadow-black/30 py-1.5 animate-scale-in origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 flex items-center gap-2.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-br from-amazon-orange to-orange-500 text-white hover:shadow-lg hover:shadow-amazon-orange/25 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={handleToggleDark}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <div className={`relative w-5 h-5 transition-transform duration-500 ${darkMode ? 'rotate-180' : 'rotate-0'}`}>
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    darkMode ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    darkMode ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4">
                <span className={`absolute left-0 block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 w-0 opacity-0' : 'top-1/2 -translate-y-1/2 w-5'}`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenu ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenu(false)}
        />
        <div
          className={`absolute top-16 right-0 w-72 max-w-[calc(100vw-2rem)] mr-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-black/20 transition-all duration-300 ${
            mobileMenu ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="p-3 space-y-0.5">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3.5 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${
                  isActive(link.to)
                    ? 'text-white bg-gradient-to-r from-amazon-orange to-orange-500 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                {link.icon ? (
                  <>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="flex-1">Cart</span>
                    {cartCount > 0 && (
                      <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {link.to === '/' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      )}
                    </svg>
                    <span className="flex-1">{link.label}</span>
                  </>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 p-3 space-y-1.5">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3.5 py-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amazon-orange to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-150"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-150"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-br from-amazon-orange to-orange-500 text-white shadow-md shadow-amazon-orange/20 hover:shadow-lg hover:shadow-amazon-orange/30 transition-all duration-200"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
