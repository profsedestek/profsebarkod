import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft, Plus, Trash2, Save, Package, Scan, Printer, Monitor,
  Computer, Smartphone, Server, Receipt, Scale, Layers, Briefcase,
  Network, Zap, Star, X, CheckCircle2, AlertCircle
} from "lucide-react";
import {
  getPackageById, createPackage, updatePackage,
  CATEGORIES, AVAILABLE_PRODUCTS, type Package as PackageType, type Product
} from "../../data/store";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scan, Printer, Monitor, Computer, Smartphone, Server, Receipt, Scale, Package, Layers,
  Briefcase, Network, Zap
};

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "Market",
  image: "",
  badge: "",
  isPopular: false,
  features: [""] as string[],
  products: [] as Product[],
};

type FormState = typeof emptyForm;

export function AdminPackageForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<FormState>(emptyForm);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [customProduct, setCustomProduct] = useState({ name: "", description: "", icon: "Package", quantity: 1 });
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (isEdit && id) {
      const pkg = getPackageById(id);
      if (pkg) {
        setForm({
          name: pkg.name,
          description: pkg.description,
          price: String(pkg.price),
          oldPrice: pkg.oldPrice ? String(pkg.oldPrice) : "",
          category: pkg.category,
          image: pkg.image,
          badge: pkg.badge || "",
          isPopular: pkg.isPopular || false,
          features: pkg.features?.length ? pkg.features : [""],
          products: pkg.products,
        });
      }
    }
  }, [id, isEdit]);

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Paket adı zorunludur";
    if (!form.description.trim()) e.description = "Açıklama zorunludur";
    if (!form.price || isNaN(Number(form.price))) e.price = "Geçerli bir fiyat girin";
    if (form.products.length === 0) e.products = "En az bir ürün ekleyin";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    const data: Omit<PackageType, "id" | "createdAt"> = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      category: form.category,
      image: form.image || "https://images.unsplash.com/photo-1623123096729-26b481292919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      badge: form.badge || undefined,
      isPopular: form.isPopular,
      features: form.features.filter((f) => f.trim()),
      products: form.products,
    };

    if (isEdit && id) {
      updatePackage(id, data);
    } else {
      createPackage(data);
    }

    setSaved(true);
    setTimeout(() => {
      navigate("/admin/paketler");
    }, 1200);
  }

  function addFeature() {
    setForm((f) => ({ ...f, features: [...f.features, ""] }));
  }

  function updateFeature(i: number, val: string) {
    setForm((f) => {
      const features = [...f.features];
      features[i] = val;
      return { ...f, features };
    });
  }

  function removeFeature(i: number) {
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  }

  function addProductFromSuggestion(suggestion: { name: string; icon: string }) {
    const prod: Product = {
      id: `prod-${Date.now()}-${Math.random()}`,
      name: suggestion.name,
      description: "",
      icon: suggestion.icon,
      quantity: 1,
    };
    setForm((f) => ({ ...f, products: [...f.products, prod] }));
    setShowProductPicker(false);
  }

  function addCustomProduct() {
    if (!customProduct.name.trim()) return;
    const prod: Product = {
      id: `prod-${Date.now()}`,
      name: customProduct.name,
      description: customProduct.description,
      icon: customProduct.icon,
      quantity: customProduct.quantity,
    };
    setForm((f) => ({ ...f, products: [...f.products, prod] }));
    setCustomProduct({ name: "", description: "", icon: "Package", quantity: 1 });
    setShowProductPicker(false);
  }

  function updateProduct(i: number, field: keyof Product, value: string | number) {
    setForm((f) => {
      const products = [...f.products];
      products[i] = { ...products[i], [field]: value };
      return { ...f, products };
    });
  }

  function removeProduct(i: number) {
    setForm((f) => ({ ...f, products: f.products.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/paketler" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-gray-900 font-extrabold text-2xl">
            {isEdit ? "Paketi Düzenle" : "Yeni Paket Oluştur"}
          </h2>
          <p className="text-gray-500 text-sm">{isEdit ? "Paket bilgilerini güncelleyin" : "Yeni bir ürün paketi oluşturun"}</p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Paket başarıyla {isEdit ? "güncellendi" : "oluşturuldu"}! Yönlendiriliyor...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-5 pb-3 border-b border-gray-100">Temel Bilgiler</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block font-medium">Paket Adı *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Örn: Market Barkod Paketi"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block font-medium">Açıklama *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Paket hakkında kısa açıklama..."
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 resize-none ${errors.description ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block font-medium">Fiyat (₺) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="12500"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 ${errors.price ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block font-medium">Eski Fiyat (₺)</label>
                  <input
                    type="number"
                    value={form.oldPrice}
                    onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                    placeholder="15000 (opsiyonel)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block font-medium">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block font-medium">Etiket (Rozet)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="Örn: En Çok Satan"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block font-medium">Görsel URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={form.isPopular}
                  onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                  className="w-4 h-4 accent-[#0D47A1]"
                />
                <label htmlFor="isPopular" className="text-sm text-gray-600 cursor-pointer flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400" /> Öne Çıkan Paket Olarak İşaretle
                </label>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-5 pb-3 border-b border-gray-100">Özellikler & Avantajlar</h3>
            <div className="space-y-2.5">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder="Örn: 1 Yıl Garanti"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10"
                  />
                  <button
                    onClick={() => removeFeature(i)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addFeature}
                className="flex items-center gap-2 text-[#0D47A1] text-sm font-medium hover:underline mt-2"
              >
                <Plus className="w-4 h-4" /> Özellik Ekle
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-gray-900 font-bold">Paket Ürünleri</h3>
                <p className="text-gray-400 text-xs mt-0.5">{form.products.length} ürün eklendi</p>
              </div>
              <button
                onClick={() => setShowProductPicker(true)}
                className="bg-[#0D47A1] hover:bg-[#1565C0] text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ürün Ekle
              </button>
            </div>

            {errors.products && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 text-red-600 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{errors.products}</span>
              </div>
            )}

            {form.products.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Henüz ürün eklenmedi</p>
                <button
                  onClick={() => setShowProductPicker(true)}
                  className="text-[#0D47A1] text-sm hover:underline mt-1"
                >
                  İlk ürünü ekle
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {form.products.map((prod, i) => (
                  <div key={prod.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="bg-[#0D47A1] rounded-xl p-2 flex-shrink-0 mt-0.5">
                      <ProductIcon name={prod.icon} className="w-4 h-4 text-[#FFC107]" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={prod.name}
                        onChange={(e) => updateProduct(i, "name", e.target.value)}
                        placeholder="Ürün Adı"
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0D47A1] bg-white"
                      />
                      <input
                        type="text"
                        value={prod.description}
                        onChange={(e) => updateProduct(i, "description", e.target.value)}
                        placeholder="Açıklama"
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0D47A1] bg-white"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min={1}
                          value={prod.quantity}
                          onChange={(e) => updateProduct(i, "quantity", Number(e.target.value))}
                          className="w-20 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0D47A1] bg-white"
                        />
                        <span className="text-gray-400 text-xs self-center">adet</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeProduct(i)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Preview */}
          {form.image && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={form.image} alt="Önizleme" className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="p-4">
                <div className="text-gray-500 text-xs">Görsel Önizleme</div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <button
              onClick={handleSave}
              disabled={saved}
              className="w-full bg-[#0D47A1] hover:bg-[#1565C0] disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              {isEdit ? "Değişiklikleri Kaydet" : "Paketi Oluştur"}
            </button>
            <Link
              to="/admin/paketler"
              className="w-full mt-3 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-gray-50 text-sm"
            >
              İptal
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <h4 className="text-gray-700 font-semibold text-sm mb-3">Paket Özeti</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ürün Sayısı</span>
                <span className="text-gray-900 font-medium">{form.products.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Özellik Sayısı</span>
                <span className="text-gray-900 font-medium">{form.features.filter(f => f.trim()).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fiyat</span>
                <span className="text-[#0D47A1] font-bold">{form.price ? Number(form.price).toLocaleString("tr-TR") + " ₺" : "—"}</span>
              </div>
              {form.oldPrice && (
                <div className="flex justify-between">
                  <span className="text-gray-500">İndirim</span>
                  <span className="text-green-600 font-medium">
                    %{Math.round((1 - Number(form.price) / Number(form.oldPrice)) * 100)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-gray-900 font-bold">Ürün Seç veya Oluştur</h3>
              <button onClick={() => setShowProductPicker(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Suggestions */}
              <div>
                <h4 className="text-gray-700 font-semibold text-sm mb-3">Hazır Ürünler</h4>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_PRODUCTS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => addProductFromSuggestion(p)}
                      className="flex items-center gap-2.5 p-3 bg-gray-50 hover:bg-[#0D47A1]/5 border border-gray-100 hover:border-[#0D47A1]/30 rounded-xl transition-all text-left"
                    >
                      <div className="bg-[#0D47A1]/10 rounded-lg p-1.5">
                        <ProductIcon name={p.icon} className="w-4 h-4 text-[#0D47A1]" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-gray-700 font-semibold text-sm mb-3">Özel Ürün Ekle</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={customProduct.name}
                    onChange={(e) => setCustomProduct({ ...customProduct, name: e.target.value })}
                    placeholder="Ürün Adı"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1]"
                  />
                  <input
                    type="text"
                    value={customProduct.description}
                    onChange={(e) => setCustomProduct({ ...customProduct, description: e.target.value })}
                    placeholder="Açıklama (opsiyonel)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">İkon</label>
                      <select
                        value={customProduct.icon}
                        onChange={(e) => setCustomProduct({ ...customProduct, icon: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] bg-white"
                      >
                        {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Adet</label>
                      <input
                        type="number"
                        min={1}
                        value={customProduct.quantity}
                        onChange={(e) => setCustomProduct({ ...customProduct, quantity: Number(e.target.value) })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addCustomProduct}
                    className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#0D47A1] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" /> Özel Ürün Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
