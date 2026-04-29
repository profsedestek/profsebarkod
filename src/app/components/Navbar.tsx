import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Phone } from "lucide-react";
import { ProfseIcon, ProfseLongLogo } from "./ProfseLogos";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D47A1] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Icon mark — always visible */}
            <div className="bg-gray-900 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
              <ProfseIcon className="w-7 h-7 text-white" />
            </div>
            {/* Full wordmark — hidden on very small screens */}
            <div className="hidden xs:flex flex-col leading-none -space-y-0.5">
              <ProfseLongLogo className="h-5 w-auto text-white" />
              <span className="text-gray-900 text-[10px] font-semibold tracking-[0.2em] uppercase pl-0.5">
                Bilişim
              </span>
            </div>
            {/* Fallback text on xs */}
            <div className="xs:hidden flex flex-col leading-none gap-0.5">
              <ProfseLongLogo className="h-5 w-auto text-white" />
              <span className="text-gray-900 text-[9px] font-semibold tracking-widest">BİLİŞİM</span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#paketler" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Paketler
            </a>
            <a href="#ozellikler" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Özellikler
            </a>
            <a href="#neden-biz" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Neden Biz?
            </a>
            <a href="#iletisim" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              İletişim
            </a>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+903426060890"
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              (0342) 606 08 90
            </a>
            <Link
              to="/admin"
              className="text-white/50 hover:text-white/80 text-xs font-medium transition-colors"
            >
              Yönetim
            </Link>
            <a
              href="#iletisim"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors shadow-sm"
            >
              Teklif Al
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B3D8C] border-t border-blue-700 px-4 py-4 flex flex-col gap-4">
          <a href="#paketler" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-1">
            Paketler
          </a>
          <a href="#ozellikler" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-1">
            Özellikler
          </a>
          <a href="#neden-biz" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-1">
            Neden Biz?
          </a>
          <a href="#iletisim" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-1">
            İletişim
          </a>
          <a href="tel:+903426060890" className="flex items-center gap-2 text-white/70 text-sm py-1">
            <Phone className="w-4 h-4" /> (0342) 606 08 90
          </a>
          <div className="flex gap-3 pt-1">
            <a
              href="#iletisim"
              onClick={() => setMobileOpen(false)}
              className="flex-1 bg-gray-900 text-white font-bold px-5 py-2.5 rounded-lg text-sm text-center"
            >
              Teklif Al
            </a>
            <Link
              to="/admin"
              className="flex-1 bg-white/10 text-white font-medium px-5 py-2.5 rounded-lg text-sm text-center border border-white/20"
            >
              Yönetim
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
