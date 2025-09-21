"use client"
import { useState, useEffect } from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"


const Electronics = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          "smartphones",
          "laptops",
          "tablets",
          "gaming-consoles",
          "headphones",
          "speakers",
          "smart-watches",
          "televisions"
        ]
  
        const categoryRequests = categories.map(category =>
          fetch(`https://dummyjson.com/products/category/${category}`).then(res => res.json())
        )
  
        const categoryData = await Promise.all(categoryRequests)
  
        const combinedProducts = categoryData.flatMap(({ products }) =>
          products.map(item => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail,
            description: item.description,
            features: [
              item.brand,
              `${item.rating}/5 Rating`,
              `${item.stock} in Stock`
            ],
            colors: ["black", "white", "gray"],
            rating: item.rating,
            reviews: item.stock,
            originalPrice: item.price + (item.discountPercentage * item.price / 100)
          }))
        )
  
        setProducts(combinedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
  
    fetchProducts()
  }, [])



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Electronics</h1>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 via-pink-200 to-purple-200 blur-2xl opacity-50"></div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-lg">
                <Link to={`/product/electronics/${product.id}`} className="block mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                  <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Electronics