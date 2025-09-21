import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Star, TrendingUp } from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Cutting-edge technology for modern life",
      items: "2000+ products"
    },
    {
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Trending styles for every occasion",
      items: "1500+ items"
    },
    {
      category: "Stationery",
      image: "https://img.freepik.com/free-photo/parallel-fineliners-white-background_23-2148224274.jpg",
      description: "Premium supplies for productivity",
      items: "800+ products"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="px-6 text-lg text-gray-600 font-inter relative inline-block">
              Welcome to the Store
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"/>
            </h1>
            
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Discover amazing products for&nbsp;
              <span className="relative inline-block group">
                <span className="absolute -inset-x-2 -inset-y-4 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-40 blur-xl rounded-lg group-hover:opacity-60 transition-opacity duration-300"></span>
                <span className="relative">every need</span>
              </span>
            </p>

            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-14">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-300 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"/>
              </Link>

              <a
                href="#featured"
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-300 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-105"
              >
                View Featured Products
                <Star className="ml-2 w-5 h-5"/>
              </a>
            </div>

            <p className="mt-8 text-base text-gray-500 font-inter flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500"/>
              Free shipping on orders over $100 · 30-day returns
            </p>
          </div>
        </div>

        <div className="pb-12 bg-white mt-16">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 h-2/3 bg-gray-50"/>
            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto overflow-hidden rounded-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Featured Products Showcase"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                    FEATURED
                  </span>
                </div>

                {/* Image Container */}
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex items-end transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{product.category}</h3>
                      <p className="text-gray-200 text-sm">{product.items}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link 
                        to={`/${product.category.toLowerCase()}`}
                        className="group/link inline-flex items-center text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                      >
                        {product.category}
                        <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                      <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
                    </div>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/electronics"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold leading-7 text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 hover:scale-105 group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;