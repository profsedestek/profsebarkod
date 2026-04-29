import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Package, TrendingUp, Users, Star, Plus, Edit, ArrowRight, BarChart3, Eye } from "lucide-react";
import { getPackages, type Package as PackageType } from "../../data/store";

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export function AdminDashboard() {
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    setPackages(getPackages());
  }, []);

  const totalProducts = packages.reduce((acc, p) => acc + p.products.length, 0);
  const popularPkgs = packages.filter((p) => p.isPopular);
  const categories = Array.from(new Set(packages.map((p) => p.category)));

  const stats = [
    { icon: Package, label: "Toplam Paket", value: packages.length, color: "bg-[#0D47A1]", change: "+2 bu ay" },
    { icon: BarChart3, label: "Toplam Ürün", value: totalProducts, color: "bg-[#FFC107]", change: `${categories.length} kategori` },
    { icon: Star, label: "Öne Çıkan", value: popularPkgs.length, color: "bg-green-600", change: "Aktif paketler" },
    { icon: TrendingUp, label: "Kategoriler", value: categories.length, color: "bg-purple-600", change: "Farklı sektör" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 font-extrabold text-2xl">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">PROFSE Bilişim yönetim özeti</p>
        </div>
        <Link
          to="/admin/paketler/yeni"
          className="bg-[#0D47A1] hover:bg-[#1565C0] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Yeni Paket
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${s.color} rounded-xl p-2.5`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-400 text-xs">{s.change}</span>
            </div>
            <div className="text-gray-900 font-extrabold text-3xl mb-1">{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-gray-900 font-bold">Paket Listesi</h3>
            <Link to="/admin/paketler" className="text-[#0D47A1] text-sm hover:underline flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {packages.slice(0, 5).map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-xl p-2">
                    <Package className="w-4 h-4 text-[#0D47A1]" />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold text-sm">{pkg.name}</div>
                    <div className="text-gray-400 text-xs">{pkg.products.length} ürün · {pkg.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#0D47A1] font-bold text-sm">{formatPrice(pkg.price)}</span>
                  {pkg.isPopular && (
                    <span className="bg-[#FFC107] text-[#0D47A1] text-xs font-bold px-2 py-0.5 rounded-full">Popüler</span>
                  )}
                  <Link
                    to={`/admin/paketler/${pkg.id}/duzenle`}
                    className="text-gray-400 hover:text-[#0D47A1] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category stats */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-bold mb-5">Kategoriler</h3>
          <div className="space-y-3">
            {categories.map((cat) => {
              const count = packages.filter((p) => p.category === cat).length;
              const pct = Math.round((count / packages.length) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-gray-700 text-sm font-medium">{cat}</span>
                    <span className="text-gray-400 text-xs">{count} paket</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0D47A1] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/paketler/yeni"
              className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#0D47A1] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" /> Yeni Paket Ekle
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Hızlı İşlemler</h3>
        <p className="text-white/70 text-sm mb-5">Sık kullanılan yönetim işlemlerine hızlıca erişin.</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/paketler/yeni"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Yeni Paket Oluştur
          </Link>
          <Link
            to="/admin/paketler"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" /> Paketleri Yönet
          </Link>
          <Link
            to="/"
            target="_blank"
            className="bg-[#FFC107] hover:bg-[#FFB300] text-[#0D47A1] text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4" /> Siteyi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}
