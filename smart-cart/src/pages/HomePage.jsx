import { Link } from 'react-router-dom';
import Button from '../components/Button';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-amazon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: 'Smart Cart',
    desc: 'Intelligent shopping cart with real-time updates and persistent storage across sessions.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-amazon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Smart Discounts',
    desc: 'Auto-applied B2G1 free deals, volume discounts (10% off 3+), and 5% cart-level savings over ₹5000.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-amazon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Search & Filter',
    desc: 'Powerful search with category filters and sorting by price, name, and popularity.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-amazon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: 'Dark Mode',
    desc: 'Seamless light/dark theme switching with persistent preference storage.',
  },
];

const techStack = [
  { name: 'React', desc: 'UI library' },
  { name: 'Redux Toolkit', desc: 'State management' },
  { name: 'Tailwind CSS', desc: 'Styling' },
  { name: 'Vite', desc: 'Build tool' },
  { name: 'React Router', desc: 'Navigation' },
  { name: 'react-hot-toast', desc: 'Notifications' },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              Smart<span className="text-amazon-orange">Cart</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A feature-rich e-commerce shopping cart built with React and Redux Toolkit.
              Experience smart discounts, real-time cart updates, and a seamless shopping experience.
            </p>

            <div className="flex items-center justify-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="cta" size="lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="secondary" size="lg">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 card-hover">
                <div className="w-12 h-12 bg-amazon-orange/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Discount Engine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 text-center card-hover">
              <div className="text-3xl font-black text-amazon-orange mb-2">B2G1</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Buy 2 Get 1 Free</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Every 3rd item is free automatically</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 text-center card-hover">
              <div className="text-3xl font-black text-amazon-orange mb-2">10%</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Volume Discount</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">10% off when you buy 3+ of the same item</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 text-center card-hover">
              <div className="text-3xl font-black text-amazon-orange mb-2">5%</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Cart Discount</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">5% off on orders over ₹5000 (toggleable)</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default HomePage;
