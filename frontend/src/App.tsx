import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/hotelList/List";
import Hotel from "./pages/hotel/Hotel";
import Auth from "./pages/auth/Auth";
import MyBookings from "./pages/bookings/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard"; // 1. Importado
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componente de Proteção Sênior
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Espera carregar o login do localStorage

  // Se não for admin, chuta de volta para a Home
  if (!user || Number(user.is_admin) !== 1) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Rota do Administrador Protegida */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;