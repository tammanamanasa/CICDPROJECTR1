import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // Track if added to cart

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Product fetch failed");
        const data = await response.json();

        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          images: data.images || [],
          description: data.description,
          category: data.category,
          rating: data.rating || 0,
          stock: data.stock,
          originalPrice: (data.price * 1.2).toFixed(2),
        });
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="flex items-center justify-center min-h-screen">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
          <li>•</li>
          <li><Link to="/" className="hover:text-gray-900">Products</Link></li>
          <li>•</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img src={product.images[selectedImage] || "/fallback.jpg"} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-gray-200 text-gray-200"}`} />
              ))}
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
          </div>

          {/* ✅ Updated Add to Cart Button */}
          <button
            onClick={(e) => {
              addToCart(product);
              setAdded(true);

              // Ripple Effect
              const ripple = document.createElement("span");
              ripple.classList.add("ripple");
              const rect = e.currentTarget.getBoundingClientRect();
              ripple.style.left = `${e.clientX - rect.left}px`;
              ripple.style.top = `${e.clientY - rect.top}px`;
              e.currentTarget.appendChild(ripple);

              setTimeout(() => {
                ripple.remove();
              }, 600);
            }}
            className={`relative overflow-hidden w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-200 ${
              added ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{product.name} is added to cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}

            {/* Ripple Effect Styling */}
            <style jsx>{`
              .ripple {
                position: absolute;
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
              }

              @keyframes ripple-animation {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
              }
            `}</style>
          </button>
        </div>
      </div>
    </div>
  );
}
