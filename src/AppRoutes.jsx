import { Routes, Route, Navigate } from "react-router";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage/UnderDevelopmentPage";
import LoginPage from "./features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage/RegisterPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import UserManagementPage from "./features/users/pages/UserManagementPage/UserManagementPage";
import UserProfilePage from "./features/users/pages/UserProfilePage/UserProfilePage";
import ProjectManagementPage from "./features/projects/pages/ProjectManagnementPage/ProjectManagementPage";
import ProjectDetailPage from "./features/projects/pages/ProjectDetailPage/ProjectDetailPage";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import CompetenceManagementPage from "./features/competences/pages/CompetenceManagementPage/CompetenceManagementPage";

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectManagementPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/stages" element={<UnderDevelopmentPage />} />
        <Route path="/tasks" element={<UnderDevelopmentPage />} />
        <Route path="/competences" element={<UnderDevelopmentPage />} />
        <Route path="/costs" element={<UnderDevelopmentPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>
    </Route>

    <Route path="/forbidden" element={<ForbiddenPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
