import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import SalesInsigth from "./pages/SalesInsigth";
import PlatformComparison from "./pages/PlatformComparison";
import ProductAnalyst from "./pages/ProductAnalyst";
import CampaignPerformance from "./pages/CampaignPerformence";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salesinsight"
          element={
            <ProtectedRoute>
              <SalesInsigth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/platform-comparison"
          element={
            <ProtectedRoute>
              <PlatformComparison />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-analyst"
          element={
            <ProtectedRoute>
              <ProductAnalyst />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaign-performance"
          element={
            <ProtectedRoute>
              <CampaignPerformance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}