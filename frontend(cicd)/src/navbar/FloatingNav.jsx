import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MonitorSmartphone, Shirt, ShoppingCart, Menu, X, Lamp } from 'lucide-react';
import './FloatingNav.css';  // Import the external CSS file

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MonitorSmartphone, label: 'Electronics', path: '/electronics' },
    { icon: Shirt, label: 'Fashion', path: '/fashion' },
    { icon: Lamp, label: 'Home-Decor', path: '/stationery' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentItemIndex((prev) => (prev + 1) % navItems.length);
          setIsTransitioning(false);
        }, 300);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const CurrentIcon = navItems[currentItemIndex].icon;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 bg-white p-6 rounded-2xl shadow-lg
          hover:shadow-xl transition-all duration-500
          ${isOpen ? 'w-16' : 'w-48'}
          ${!isOpen && 'hover:scale-105 hover:bg-gray-50'}
          group relative`}
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
      >
        {isOpen ? (
          <X size={28} className="text-gray-700" />
        ) : (
          <div className={`flex items-center gap-3 w-full
            ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
            transition-all duration-600 ease-in-out`}>
            <div className="relative">
              <CurrentIcon size={28} className="text-gray-700" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full 
                animate-ping opacity-75" />
            </div>
            <span className="text-base font-medium text-gray-700">
              {navItems[currentItemIndex].label}
            </span>
          </div>
        )}
      </button>

      {/* Navigation menu */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 bg-white rounded-2xl shadow-lg 
          p-6 min-w-[280px] animate-slideIn"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <nav className="flex flex-col gap-5">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 
                    rounded-xl transition-all duration-300 group"
                >
                  <IconComponent size={24} className="text-gray-700 
                    group-hover:text-blue-500 transition-colors duration-300" />
                  <span className="text-base text-gray-700 font-medium 
                    group-hover:text-blue-500 transition-colors duration-300">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default FloatingNav;
