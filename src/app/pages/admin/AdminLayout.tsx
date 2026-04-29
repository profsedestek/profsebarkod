import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  LayoutDashboard, Package, Plus, Settings, ChevronLeft,
  Menu, X, ExternalLink
} from "lucide-react";
import { ProfseIcon, ProfseLongLogo } from "../../components/ProfseLogos";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/paketler", icon: Package, label: "Paketler" },
  { to: "/admin/paketler/yeni", icon: Plus, label: "Yeni Paket" },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  function isActive(to: string, exact?: boolean) {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-[#0A0A0A] ${mobile ? "w-72" : collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      {/* Logo */}
      <div className={`flex items-center ${collapsed && !mobile ? "justify-center px-3" : "px-5"} py-5 border-b border-white/10`}>
        <div className="bg-gray-900 rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center">
          <ProfseIcon className="w-5 h-5 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div className="ml-2 overflow-hidden flex flex-col gap-0.5">
            <ProfseLongLogo className="h-4 w-auto text-white" />
            <span className="text-gray-700 text-[9px] font-semibold tracking-[0.18em] uppercase">Yönetim</span>
          </div>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              isActive(item.to, item.exact)
                ? "bg-[#0D47A1] text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || mobile) && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className={`border-t border-white/10 p-3 space-y-1 ${collapsed && !mobile ? "flex flex-col items-center" : ""}`}>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {(!collapsed || mobile) && <span className="text-sm">Siteye Git</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar mobile />
          </div>
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900 font-bold">Yönetim Paneli</h1>
              <p className="text-gray-400 text-xs">PROFSE Bilişim</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-[#0D47A1] flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Siteyi Görüntüle
            </Link>
            <div className="w-8 h-8 bg-[#0D47A1] rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}