import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Phone, ChevronDown, Package, Sparkles, Shield, MessageCircle, ArrowRight } from "lucide-react";
import { ProfseIcon, ProfseLongLogo } from "./ProfseLogos";

interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const paketlerItems: MegaMenuItem[] = [
  { title: "Başlangıç Paketi", description: "Küçük işletmeler için ideal çözüm", href: "#paketler", icon: <Package className="w-5 h-5" /> },
  { title: "Profesyonel Paket", description: "Büyüyen işletmeler için gelişmiş özellikler", href: "#paketler", icon: <Sparkles className="w-5 h-5" /> },
  { title: "Enterprise", description: "Kurumsal ölçekli çözümler", href: "#paketler", icon: <Shield className="w-5 h-5" /> },
];

const ozelliklerItems: MegaMenuItem[] = [
  { title: "E-Ticaret Altyapısı", description: "Hızlı ve güvenli altyapı", href: "#ozellikler", icon: <Package className="w-5 h-5" /> },
  { title: "Pazaryeri Entegrasyonu", description: "Trendyol, Hepsiburada, Amazon", href: "#ozellikler", icon: <Sparkles className="w-5 h-5" /> },
  { title: "Kargo Entegrasyonu", description: "Tüm kargo firmalarıyla entegrasyon", href: "#ozellikler", icon: <Shield className="w-5 h-5" /> },
  { title: "Muhasebe Sistemi", description: "Otomatik fatura ve raporlama", href: "#ozellikler", icon: <MessageCircle className="w-5 h-5" /> },
];

function MegaMenu({ items, isOpen, onMouseEnter, onMouseLeave }: { 
  items: MegaMenuItem[]; 
  isOpen: boolean; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-4">
        <div className="grid gap-2">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[#0D47A1]/5 transition-all duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0D47A1]/10 flex items-center justify-center group-hover:bg-[#0D47A1] transition-colors duration-200">
                <div className="text-[#0D47A1] group-hover:text-white transition-colors duration-200">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#0D47A1] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0D47A1] opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 mt-2" />
            </a>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <a href="#iletisim" className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#0D47A1] hover:text-[#0B3D8C] transition-colors">
          <span>Tümünü gör</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function NavItem({ 
  children, 
  href,
  hasDropdown = false,
  isOpen = false,
  onMouseEnter,
  onMouseLeave
}: { 
  children: React.ReactNode; 
  href: string;
  hasDropdown?: boolean;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a 
        href={href} 
        className="flex items-center gap-1 text-white/90 hover:text-white transition-colors text-sm font-medium py-2"
      >
        {children}
        {hasDropdown && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </a>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D47A1] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-gray-900 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
              <ProfseIcon className="w-7 h-7 text-white" />
            </div>
            <div className="hidden xs:flex flex-col leading-none -space-y-0.5">
              <ProfseLongLogo className="h-5 w-auto text-white" />
              <span className="text-gray-900 text-[10px] font-semibold tracking-[0.2em] uppercase pl-0.5">
                Bilişim
              </span>
            </div>
            <div className="xs:hidden flex flex-col leading-none gap-0.5">
              <ProfseLongLogo className="h-5 w-auto text-white" />
              <span className="text-gray-900 text-[9px] font-semibold tracking-widest">BİLİŞİM</span>
            </div>
          </Link>

          {/* Desktop Nav links with Mega Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu('paketler')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <NavItem 
                href="#paketler" 
                hasDropdown 
                isOpen={activeMenu === 'paketler'}
              >
                Paketler
              </NavItem>
              <MegaMenu 
                items={paketlerItems} 
                isOpen={activeMenu === 'paketler'}
                onMouseEnter={() => setActiveMenu('paketler')}
                onMouseLeave={() => setActiveMenu(null)}
              />
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu('ozellikler')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <NavItem 
                href="#ozellikler" 
                hasDropdown 
                isOpen={activeMenu === 'ozellikler'}
              >
                Özellikler
              </NavItem>
              <MegaMenu 
                items={ozelliklerItems} 
                isOpen={activeMenu === 'ozellikler'}
                onMouseEnter={() => setActiveMenu('ozellikler')}
                onMouseLeave={() => setActiveMenu(null)}
              />
            </div>

            <NavItem href="#neden-biz">Neden Biz?</NavItem>
            <NavItem href="#iletisim">İletişim</NavItem>
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

      {/* Mobile menu with expandable sections */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B3D8C] border-t border-blue-700 px-4 py-4 flex flex-col gap-2">
          {/* Paketler expandable */}
          <div>
            <button 
              onClick={() => setMobileExpanded(mobileExpanded === 'paketler' ? null : 'paketler')}
              className="w-full flex items-center justify-between text-white/90 hover:text-white text-sm font-medium py-2"
            >
              <span>Paketler</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'paketler' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'paketler' && (
              <div className="pl-4 py-2 space-y-2">
                {paketlerItems.map((item) => (
                  <a 
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-white/70 hover:text-white text-sm py-1"
                  >
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Ozellikler expandable */}
          <div>
            <button 
              onClick={() => setMobileExpanded(mobileExpanded === 'ozellikler' ? null : 'ozellikler')}
              className="w-full flex items-center justify-between text-white/90 hover:text-white text-sm font-medium py-2"
            >
              <span>Özellikler</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'ozellikler' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'ozellikler' && (
              <div className="pl-4 py-2 space-y-2">
                {ozelliklerItems.map((item) => (
                  <a 
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-white/70 hover:text-white text-sm py-1"
                  >
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#neden-biz" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-2">
            Neden Biz?
          </a>
          <a href="#iletisim" onClick={() => setMobileOpen(false)} className="text-white/90 hover:text-white text-sm font-medium py-2">
            İletişim
          </a>
          
          <div className="border-t border-blue-700 pt-3 mt-2">
            <a href="tel:+903426060890" className="flex items-center gap-2 text-white/70 text-sm py-2">
              <Phone className="w-4 h-4" /> (0342) 606 08 90
            </a>
          </div>
          
          <div className="flex gap-3 pt-2">
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
