import { createBrowserRouter } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { PackageDetail } from "./pages/PackageDetail";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPackages } from "./pages/admin/AdminPackages";
import { AdminPackageForm } from "./pages/admin/AdminPackageForm";
import { Outlet } from "react-router";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: "paket/:id", Component: PackageDetail },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "paketler", Component: AdminPackages },
      { path: "paketler/yeni", Component: AdminPackageForm },
      { path: "paketler/:id/duzenle", Component: AdminPackageForm },
    ],
  },
]);
