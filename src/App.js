import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// Normal imports (should NOT be lazy)
import { NavbarDemo } from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";
import { useAuth } from "./context/AdminContext";
import { getCurrentLocation } from "./lib/getCurrentLocation";
import { reverseGeocode } from "./lib/reverseGeocode";
import { useUser } from "./context/UserContext";
import SubNavbar from "./components/SubNavbar";

// Lazy imports (components/pages)
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const AllCakes = React.lazy(() => import("./pages/AllCakes"));
const CakeDetails = React.lazy(() => import("./pages/CakeDetails"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Footer = React.lazy(() => import("./components/Footer"));
const Products = React.lazy(() => import("./components/Products"));
const Profile = React.lazy(() => import("./pages/Profile"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const OrderSuccess = React.lazy(() => import("./pages/OrderSuccess"));
const PrivacyPolicy = React.lazy(() => import("./pages/plicy/PrivacyPolicy"));
const Terms = React.lazy(() => import("./pages/plicy/Terms"));
const RefundPolicy = React.lazy(() => import("./pages/plicy/RefundPolicy"));
const ShippingDelivery = React.lazy(() => import("./pages/plicy/ShippingDelivery"));
const AdminLayout = React.lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("./components/admin/Dashboard"));
const Orders = React.lazy(() => import("./components/admin/Orders"));
const AdminProducts = React.lazy(() => import("./components/admin/Products"));
const Users = React.lazy(() => import("./components/admin/Users"));
const Analytics = React.lazy(() => import("./components/admin/Analytics"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const DeliveryBoys = React.lazy(() => import("./components/admin/DeliveryBoys"));
const CreateUser = React.lazy(() => import("./components/admin/CreateUser"));
const Templates = React.lazy(() => import("./components/admin/Templates"));

const AnniversaryCakes = React.lazy(() => import("./pages/Anniversary/AnniversaryCakes"));
const BirthdayCakes = React.lazy(() => import("./pages/BirthDay/BirthdayCakes"));
const CorporateCakes = React.lazy(() => import("./pages/CorporateCakes"));
const SuperManCake = React.lazy(() => import("./pages/ThemeCake/SuperManCake"));
const CartoonCake = React.lazy(() => import("./pages/ThemeCake/CartoonCake"));
const Cricket = React.lazy(() => import("./pages/ThemeCake/Cricket"));
const Nature = React.lazy(() => import("./pages/ThemeCake/Nature"));
const FriendshipDay = React.lazy(() => import("./pages/Occasion/FriendshipDay"));
const DownloadApk = React.lazy(() => import("./pages/DownloadApk"));
const CommanPage = React.lazy(() => import("./pages/CommonPage"));


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}


// Public Route Component
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/user-profile" replace />
  }
  return children
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />
  }

  // Check if admin has the required role
  if (admin.role !== 'admin' && admin.role !== 'delivery_boy') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// App Content with useLocation
const App = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, syncLocationAddress} = useUser();
  const [locationSynced, setLocationSynced] = useState(false);
  useEffect(() => {
    const syncLocation = async () => {
      if (user && !locationSynced) {
        try {
          setLoading(true);
          const loc = await getCurrentLocation();
          const addr = await reverseGeocode(loc.latitude, loc.longitude);
          
          const newAddress = {
            type: 'Home',
            street: addr.street,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            location: {
              latitude: loc.latitude,
              longitude: loc.longitude
            },
            isDefault: user.addresses?.length === 0
          };

          await syncLocationAddress(newAddress);
          setLocationSynced(true); // Mark as synced
        } catch (err) {
          setError("Unable to fetch current location");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    syncLocation();
  }, [user, locationSynced, syncLocationAddress]);
  const adminPaths = [
    '/admin',
    '/admin/login',
    '/admin/orders',
    '/admin/products',
    '/admin/users',
    '/admin/analytics',
    '/admin/delivery-boys',
    '/admin/create-user',
    'admin/create-template'
  ]

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path))

  return (
    <>
      <ScrollToTop />
      <div className="bg-[#f4eee1] min-h-screen flex flex-col">
        {!isAdminRoute && <NavbarDemo />}
        {!isAdminRoute && <SubNavbar />}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/products" element={<Products />} />
            <Route path="/delievery" element={<DeliveryBoys />} />
            <Route path="/all-cakes" element={<AllCakes />} />
            <Route path="/anniversary" element={<AnniversaryCakes />} />
            <Route path="/birthday-cakes" element={<BirthdayCakes />} />
            <Route path="/superhero-cakes" element={<SuperManCake />} />
            <Route path="/cartoon-cakes" element={<CartoonCake />} />
            <Route path="/cricket-cakes" element={<Cricket />} />
            <Route path="/nature-cakes" element={<Nature />} />
            <Route path="/cakes/:id" element={<CommanPage />} />
            <Route path="/friendshipday-cakes" element={<FriendshipDay />} />
            <Route path="/corporates-cakes" element={<CorporateCakes />} />
            <Route path="/cake/:id" element={<CakeDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/download" element={<DownloadApk />} />
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Profile />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Orders />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Analytics />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/delivery-boys"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <DeliveryBoys />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-user"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <CreateUser />
                  </AdminLayout>
                </AdminRoute>
              }
            />
                        <Route
              path="/admin/create-template"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Templates />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

export default App
