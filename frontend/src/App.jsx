import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import AddServicePage from "./pages/AddServicePage";
import LogsPage from "./pages/LogsPage";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-service" element={<AddServicePage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
