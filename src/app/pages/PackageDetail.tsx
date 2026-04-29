import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft, CheckCircle2, Phone, Mail, Scan, Printer, Monitor,
  Computer, Smartphone, Server, Receipt, Scale, Package, Layers,
  Briefcase, Network, Zap, ShoppingCart, Star, Shield, Headphones,
  ChevronRight
} from "lucide-react";
import { getPackageById, type Package as PackageType } from "../data/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scan, Printer, Monitor, Computer, Smartphone, Server, Receipt, Scale, Package, Layers,
  Briefcase, Network, Zap, ShoppingCart, MonitorSmartphone: Monitor, Tablet: Smartphone
};

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<PackageType | undefined>();

  useEffect(() => {
    async function load() {
      if (id) {
        const pkg = await getPackageById(id);
        setPkg(pkg);
      }
    }
    load();
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-gray-700 font-bold text-xl mb-2">Paket Bulunamadı</h2>
          <Link to="/" className="text-[#0D47A1] hover:underline">Ana sayfaya dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-[#0D47A1] flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfa
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link to="/#paketler" className="text-gray-400 hover:text-[#0D47A1]">Paketler</Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-700 font-medium">{pkg.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              <ImageWithFallback
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-72 lg:h-96 object-cover"
              />
              {pkg.badge && (
                <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold ${
                  pkg.isPopular ? "bg-gray-900 text-white" : "bg-[#0D47A1] text-white"
                }`}>
                  {pkg.badge}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block bg-[#0D47A1]/10 text-[#0D47A1] text-xs font-semibold px-3 py-1 rounded-full mb-2">{pkg.category}</span>
                  <h1 className="text-gray-900 font-extrabold text-2xl lg:text-3xl">{pkg.name}</h1>
                </div>
                <div className="text-right flex-shrink-0">
                  {pkg.oldPrice && (
                    <div className="text-gray-400 line-through text-sm">{formatPrice(pkg.oldPrice)}</div>
                  )}
                  <div className="text-[#0D47A1] font-extrabold text-3xl">{formatPrice(pkg.price)}</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>

              {pkg.features && (
                <div className="flex flex-wrap gap-3 mt-5">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 font-bold text-xl mb-5">Paket İçeriği</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.products.map((prod) => (
                  <div key={prod.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="bg-[#0D47A1] rounded-xl p-2.5 flex-shrink-0">
                      <ProductIcon name={prod.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-sm">{prod.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{prod.description}</div>
                    </div>
                    {prod.quantity > 1 && (
                      <div className="bg-gray-900/20 text-gray-900 font-bold text-xs px-2 py-0.5 rounded-full">
                        x{prod.quantity}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Sidebar */}
          <div className="space-y-5">
            {/* Order card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-gray-900 font-bold text-lg mb-4">Bu Paketi Almak İstiyorum</h3>
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Toplam Fiyat</span>
                <span className="text-[#0D47A1] font-extrabold text-2xl">{formatPrice(pkg.price)}</span>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+902121234567"
                  className="w-full bg-[#0D47A1] hover:bg-[#1565C0] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-5 h-5" /> Hemen Ara
                </a>
                <a
                  href="mailto:info@profse.com.tr"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-5 h-5" /> Teklif İste
                </a>
                <Link
                  to="/"
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200"
                >
                  <ArrowLeft className="w-5 h-5" /> Paketlere Dön
                </Link>
              </div>

              {/* Guarantees */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                {[
                  { icon: Shield, text: "Resmi Garanti Dahil" },
                  { icon: Headphones, text: "7/24 Teknik Destek" },
                  { icon: CheckCircle2, text: "Ücretsiz Kurulum" },
                ].map((g) => (
                  <div key={g.text} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <g.icon className="w-4 h-4 text-[#0D47A1]" />
                    {g.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-[#0D47A1] rounded-2xl p-6 text-white">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-gray-900 text-gray-900" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                "Bu paket işletmemizin verimliliğini %40 artırdı. Kesinlikle tavsiye ediyorum."
              </p>
              <div className="text-white font-semibold text-sm">Mehmet A. — Market İşletmecisi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}