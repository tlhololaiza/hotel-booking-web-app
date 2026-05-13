import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Header } from "./components/layout/Header/Header";
import { Footer } from "./components/layout/Footer/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
interface ProtectedRouteProps {
  element: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ element, requireAuth = true, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border b-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requireAuth && currentUser) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AppContent = () => (
  <>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route 
              path="/login" 
              element={<ProtectedRoute element={<Login />} requireAuth={false} redirectTo="/" />} 
            />
            <Route 
              path="/register" 
              element={<ProtectedRoute element={<Register />} requireAuth={false} redirectTo="/" />} 
            />
            <Route 
              path="/profile" 
              element={<ProtectedRoute element={<Profile />} />} 
            />
            <Route 
              path="/admin" 
              element={<ProtectedRoute element={<Admin />} />} 
            />
            <Route 
              path="/favorites" 
              element={<ProtectedRoute element={<Favorites />} />} 
            />
            <Route 
              path="/notifications" 
              element={<ProtectedRoute element={<Notifications />} />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
