import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import KitchenLayout from "./layouts/KitchenLayout/KitchenLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import PublicMenuPage from "./features/menus/pages/PublicMenuPage/PublicMenuPage";
import LoginPage from "./features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage/RegisterPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import KitchenSuggestionsPage from "./features/suggestions/pages/KitchenSuggestionPage/KitchenSuggestionsPage";
import KitchenSuggestionDetailPage from "./features/suggestions/pages/KitchenSuggestionDetailPage/KitchenSuggestionDetailPage";
import AdminSuggestionPage from "./features/suggestions/pages/AdminSuggestionPage/AdminSuggestionsPage";
import AdminSuggestionDetailPage from "./features/suggestions/pages/AdminSuggestionDetailPage/AdminSuggestionDetailPage";
import InspirationPage from "./features/menu-inspirations/pages/InspirationPage";
import UserManagementPage from "./features/users/pages/UserManagementPage/UserManagementPage";
import UserDetailPage from "./features/users/pages/UserDetailPage/UserDetailPage";
import UserProfilePage from "./features/users/pages/UserProfilePage/UserProfilePage";
import StationManagementPage from "./features/stations/pages/StationManagementPage/StationManagementPage";
import StationDetailPage from "./features/stations/pages/StationDetailPage/StationDetailPage";
import AllergenManagementPage from "./features/allergens/pages/AllergenManagementPage/AllergenManagementPage";
import AllergenDetailPage from "./features/allergens/pages/AllergenDetailPage/AllergenDetailPage";
import DishManagementPage from "./features/dishes/pages/DishManagementPage/DishManagementPage";
import DishDetailPage from "./features/dishes/pages/DishDetailPage/DishDetailPage";
import MenuManagementPage from "./features/menus/pages/MenuManagementPage/MenuManagementPage";
import MenuEditorPage from "./features/menus/pages/MenuEditorPage/MenuEditorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage/UnderDevelopmentPage";
import KitchenIngredientRequestPage from "./features/ingredient-requests/pages/KitchenIngredientRequestPage/KitchenIngredientRequestPage";
import KitchenIngredientRequestDetailPage from "./features/ingredient-requests/pages/KitchenIngredientRequestDetailPage/KitchenIngredientRequestDetailPage";
import IngredientRequestManagementPage from "./features/ingredient-requests/pages/IngredientRequestManagementPage/IngredientRequestManagementPage";
import AdminIngredientRequestDetailPage from "./features/ingredient-requests/pages/AdminIngredientRequestDetailPage/AdminIngredientRequestDetailPage";
import ShoppingListManagementPage from "./features/shopping-lists/pages/ShoppingListManagementPage/ShoppingListManagementPage";
import ShoppingListDetailPage from "./features/shopping-lists/pages/ShoppingListDetailPage/ShoppingListDetailPage";
import AdminInspirationPage from "./features/menu-inspirations/pages/AdminInspirationPage";
import TakeawayManagementPage from "./features/takeaway-offers/pages/TakeawayManagementPage/TakeawayManagementPage";
import AdminTakeawayOfferDetailPage from "./features/takeaway-offers/pages/AdminTakeawayDetailPage/AdminTakeawayDetailPage";
import PublicTakeawayPage from "./features/takeaway-offers/pages/PublicTakeawayPage/PublicTakeawayPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<PublicMenuPage />} />
        <Route path="/menu" element={<PublicMenuPage />} />
        <Route path="/takeaway" element={<UnderDevelopmentPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        element={<ProtectedRoute allowedRoles={["HEAD_CHEF", "SOUS_CHEF"]} />}
      >
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dish-suggestions" element={<AdminSuggestionPage />} />
          <Route
            path="dish-suggestions/:id"
            element={<AdminSuggestionDetailPage />}
          />
          <Route path="menu-inspirations" element={<AdminInspirationPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="stations" element={<StationManagementPage />} />
          <Route path="allergens" element={<AllergenManagementPage />} />
          <Route path="allergens/:id" element={<AllergenDetailPage />} />
          <Route path="stations/:id" element={<StationDetailPage />} />
          <Route path="dishes" element={<DishManagementPage />} />
          <Route path="dishes/:id" element={<DishDetailPage />} />
          <Route path="menus" element={<MenuManagementPage />} />
          <Route path="menus/:id" element={<MenuEditorPage />} />
          <Route
            path="ingredient-requests"
            element={<IngredientRequestManagementPage />}
          />
          <Route
            path="ingredient-requests/:id"
            element={<AdminIngredientRequestDetailPage />}
          />
          <Route
            path="shopping-lists"
            element={<ShoppingListManagementPage />}
          />
          <Route
            path="shopping-lists/:id"
            element={<ShoppingListDetailPage />}
          />
          <Route path="takeaway" element={<TakeawayManagementPage />} />
          <Route
            path="takeaway/:id"
            element={<AdminTakeawayOfferDetailPage />}
          />
          <Route path="takeaway-orders" element={<UnderDevelopmentPage />} />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["HEAD_CHEF", "SOUS_CHEF", "LINE_COOK"]}
          />
        }
      >
        <Route path="kitchen" element={<KitchenLayout />}>
          <Route index element={<Navigate to="menu" replace />} />
          <Route path="menu" element={<PublicMenuPage />} />
          <Route path="suggestions" element={<KitchenSuggestionsPage />} />
          <Route
            path="suggestions/:id"
            element={<KitchenSuggestionDetailPage />}
          />
          <Route path="inspiration" element={<InspirationPage />} />
          <Route path="requests" element={<KitchenIngredientRequestPage />} />
          <Route
            path="requests/:id"
            element={<KitchenIngredientRequestDetailPage />}
          />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
