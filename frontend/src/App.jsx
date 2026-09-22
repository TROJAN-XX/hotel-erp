import { Routes, Route } from "react-router-dom";
import CustomerLayout from "./components/layout/CustomerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import HomePage from "./pages/customer/HomePage";
import RoomsPage from "./pages/customer/RoomsPage";
import DiningPage from "./pages/customer/DiningPage";
import ToursPage from "./pages/customer/ToursPage";
import TransportPage from "./pages/customer/TransportPage";
import WellnessPage from "./pages/customer/WellnessPage";
import PackagesPage from "./pages/customer/PackagesPage";
import MyTripsPage from "./pages/customer/MyTripsPage";
import ProfilePage from "./pages/customer/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminRoomsPage from "./pages/admin/AdminRoomsPage";
import AdminRestaurantsPage from "./pages/admin/AdminRestaurantsPage";
import AdminToursPage from "./pages/admin/AdminToursPage";
import AdminTransportPage from "./pages/admin/AdminTransportPage";
import AdminWellnessPage from "./pages/admin/AdminWellnessPage";
import AdminPackagesPage from "./pages/admin/AdminPackagesPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="restaurants" element={<DiningPage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="transport" element={<TransportPage />} />
        <Route path="wellness" element={<WellnessPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="trips" element={<MyTripsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="rooms" element={<AdminRoomsPage />} />
        <Route path="restaurants" element={<AdminRestaurantsPage />} />
        <Route path="tours" element={<AdminToursPage />} />
        <Route path="transport" element={<AdminTransportPage />} />
        <Route path="wellness" element={<AdminWellnessPage />} />
        <Route path="packages" element={<AdminPackagesPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}
