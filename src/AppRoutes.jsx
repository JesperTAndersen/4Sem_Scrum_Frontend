import { Routes, Route, Navigate } from "react-router";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import LoginPage from "./features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage/RegisterPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import UserManagementPage from "./features/users/pages/UserManagementPage/UserManagementPage";
import UserProfilePage from "./features/users/pages/UserProfilePage/UserProfilePage";
import ProjectManagementPage from "./features/projects/pages/ProjectManagnementPage/ProjectManagementPage";
import ProjectDetailPage from "./features/projects/pages/ProjectDetailPage/ProjectDetailPage";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import CompetenceManagementPage from "./features/competences/pages/CompetenceManagementPage/CompetenceManagementPage";
import CompetenceDetailPage from "./features/competences/pages/CompetenceDetailPage/CompetenceDetailPage";
import EmployeeDetailPage from "./features/employees/pages/EmployeeDetailPage/EmployeeDetailPage";
import EmployeeManagementPage from "./features/employees/pages/EmployeeManagementPage/EmployeeManagementPage";

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
        <Route path="/competences" element={<CompetenceManagementPage />} />
        <Route path="/competences/:id" element={<CompetenceDetailPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/employees" element={<EmployeeManagementPage />}/>
        <Route path="/employees/:id" element={<EmployeeDetailPage />}/>
      </Route>
    </Route>

    <Route path="/forbidden" element={<ForbiddenPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
