import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import MobileBottomNav from './components/MobileBottomNav'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './context/StoreContext'
import AccountHome from './pages/account/AccountHome'
import DeliveryAddress from './pages/account/DeliveryAddress'
import MyOrders from './pages/account/MyOrders'
import MyProfile from './pages/account/MyProfile'
import MyWardrobe from './pages/account/MyWardrobe'
import BestSellersPage from './pages/BestSellersPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Login from './pages/Login'
import NewArrivalsPage from './pages/NewArrivalsPage'
import Signup from './pages/Signup'
import Wishlist from './pages/Wishlist'
import EcoLivingPage from './pages/EcoLivingPage'
import KidsClothingPage from './pages/KidsClothingPage'
import KidsFootwearPage from './pages/KidsFootwearPage'
import KidsInnerwearPage from './pages/KidsInnerwearPage'
import KidsNightwearPage from './pages/KidsNightwearPage'
import MenClothingPage from './pages/MenClothingPage'
import MenInnerwearPage from './pages/MenInnerwearPage'
import MenNightwearPage from './pages/MenNightwearPage'
import WomenBagsPage from './pages/WomenBagsPage'
import WomenClothingPage from './pages/WomenClothingPage'
import WomenFootwearPage from './pages/WomenFootwearPage'
import WomenInnerwearPage from './pages/WomenInnerwearPage'
import WomenNightwearPage from './pages/WomenNightwearPage'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import CookiesPolicyPage from './pages/CookiesPolicyPage'

function AppShell() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-14 lg:pb-0">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onShopNewArrivals={() => navigate('/new-arrivals')}
              onShopBestSellers={() => navigate('/best-sellers')}
            />
          }
        />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/best-sellers" element={<BestSellersPage />} />
        <Route path="/women/clothing" element={<WomenClothingPage />} />
        <Route path="/women/footwear" element={<WomenFootwearPage />} />
        <Route path="/women/nightwear" element={<WomenNightwearPage />} />
        <Route path="/women/innerwear" element={<WomenInnerwearPage />} />
        <Route path="/women/bags" element={<WomenBagsPage />} />
        <Route path="/men/clothing" element={<MenClothingPage />} />
        <Route path="/men/nightwear" element={<MenNightwearPage />} />
        <Route path="/men/innerwear" element={<MenInnerwearPage />} />
        <Route path="/kids/clothing" element={<KidsClothingPage />} />
        <Route path="/kids/nightwear" element={<KidsNightwearPage />} />
        <Route path="/eco-living" element={<EcoLivingPage />} />
        <Route path="/kids/innerwear" element={<KidsInnerwearPage />} />
        <Route path="/kids/footwears" element={<KidsFootwearPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/addresses"
          element={
            <ProtectedRoute>
              <DeliveryAddress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/wardrobe"
          element={
            <ProtectedRoute>
              <MyWardrobe />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toast />
      <MobileBottomNav />
      <FloatingWhatsApp />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  )
}

export default App
