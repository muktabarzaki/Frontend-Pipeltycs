import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import SalesInsigth from "./pages/SalesInsigth";
import PlatformComparison from "./pages/PlatformComparison";
import ProductAnalyst from "./pages/ProductAnalyst";
import CampaignPerformance from "./pages/CampaignPerformence";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/salesinsight" element={<SalesInsigth />} />
        <Route path="/platform-comparison" element={<PlatformComparison />} />
        <Route path="/product-analyst" element={<ProductAnalyst />} />
        <Route path="/campaign-performance" element={<CampaignPerformance />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}