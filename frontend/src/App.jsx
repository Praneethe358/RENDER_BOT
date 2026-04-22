import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import AddServicePage from "./pages/AddServicePage";
import LogsPage from "./pages/LogsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/add-service"
        element={
          <AppLayout>
            <AddServicePage />
          </AppLayout>
        }
      />
      <Route
        path="/logs"
        element={
          <AppLayout>
            <LogsPage />
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
