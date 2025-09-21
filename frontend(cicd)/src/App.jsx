"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FloatingNav from "./navbar/FloatingNav"
import Home from "./pages/Home"
import Electronics from "./pages/Electronics"
import Fashion from "./pages/Fashion"
import Stationery from "./pages/Stationery"
import Loginpage from "./components/Auth/Login"
import Registration from "./components/Auth/Registration"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart" // Import Cart component
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/fashion" element={<Fashion />} />
              <Route path="/stationery" element={<Stationery />} />
              <Route path="/product/:category/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
            </Routes>
          </main>
          <Footer />
          <FloatingNav />
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
