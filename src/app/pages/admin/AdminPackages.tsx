import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Plus, Edit, Trash2, Search, Filter, Package, Eye,
  Star, ChevronUp, ChevronDown
} from "lucide-react";
import { getPackages, type Package as PackageType } from "../../data/store";
import { deletePackageFromSupabase } from "../../lib/supabase";

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export function AdminPackages() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tümü");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    const pkgs = await getPackages();
    setPackages(pkgs);
  }

  useEffect(() => {
    load();
  }, []);

  const categories = ["Tümü", ...Array.from(new Set(packages.map((p) => p.category)))];

  const filtered = packages.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "Tümü" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  async function handleDelete(id: string) {
    await deletePackageFromSupabase(id);
    setConfirmDelete(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900 font-extrabold text-2xl">Paket Yönetimi</h2>
          <p className="text-gray-500 text-sm mt-1">{packages.length} paket · {filtered.length} gösteriliyor</p>
        </div>
        <Link
          to="/admin/paketler/yeni"
          className="bg-[#0D47A1] hover:bg-[#1565C0] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Yeni Paket
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Paket ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                categoryFilter === cat
                  ? "bg-[#0D47A1] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0D47A1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paket</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Ürün Sayısı</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fiyat</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Durum</th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <div className="text-sm">Paket bulunamadı</div>
                  </td>
                </tr>
              ) : (
                filtered.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold text-sm">{pkg.name}</div>
                          {pkg.badge && (
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                              pkg.isPopular ? "bg-gray-900/20 text-gray-900" : "bg-blue-50 text-[#0D47A1]"
                            }`}>
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg">{pkg.category}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-gray-700 text-sm">{pkg.products.length} ürün</span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <div className="text-[#0D47A1] font-bold text-sm">{formatPrice(pkg.price)}</div>
                        {pkg.oldPrice && (
                          <div className="text-gray-400 line-through text-xs">{formatPrice(pkg.oldPrice)}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {pkg.isPopular ? (
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Öne Çıkan
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full" /> Aktif
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/paket/${pkg.id}`}
                          title="Görüntüle"
                          className="p-2 text-gray-400 hover:text-[#0D47A1] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/paketler/${pkg.id}/duzenle`}
                          title="Düzenle"
                          className="p-2 text-gray-400 hover:text-[#0D47A1] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(pkg.id)}
                          title="Sil"
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg text-center mb-2">Paketi Sil</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Bu paketi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
