import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import AdminDashboard from "./pages/admin";
import BookingSummaryPage from "./pages/booking-summary";
import GovernoratesPage from "./pages/governorates";
import HomePage from "./pages/HomePage";
import HotelDetailsPage from "./pages/hotels/HotelDetailsPage";
import HotelsPage from "./pages/hotels/HotelsPage";
import UserOrdersPage from "./pages/user-orders";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import CarRentalsPage from "./pages/cars/CarPage";
import CarDetailsPage from "./pages/cars/Carpagedetails";
import { CarProvider } from "./pages/cars/CarContext";


function ProtectedRoute({ children, requiredRole }) {
  const { token, loading, userdata } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userdata?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      {/* + */}
         <CarProvider>
       {/*  */}    
        <Header />
        <Routes>
          {/*  */}
          {/*  */}
          {/*  */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/*  */}
          {/*  */}
          {/*  */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/governorates"
            element={
              <ProtectedRoute>
                <GovernoratesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <HotelsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:id"
            element={
              <ProtectedRoute>
                <HotelDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarRentalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <ProtectedRoute>
                <CarDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-orders"
            element={
              <ProtectedRoute>
                <UserOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-summary"
            element={
              <ProtectedRoute>
                <BookingSummaryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        {/* + */}
         </CarProvider>
         {/*  */}
      </AuthProvider>
    </BrowserRouter>
  );
}
