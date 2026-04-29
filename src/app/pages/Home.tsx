import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Scan, Printer, Monitor, Computer, Phone, Mail, MapPin,
  ChevronRight, Star, Shield, Headphones, Truck, Zap, CheckCircle2,
  ArrowRight, Package, BarChart3, Users, Award,
  Smartphone, Server, Receipt, Scale, Layers, Briefcase, Network
} from "lucide-react";
import { getPackages, type Package as PackageType } from "../data/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProfseIcon, ProfseLongLogo } from "../components/ProfseLogos";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scan, Printer, Monitor, Computer, Smartphone, Server, Receipt, Scale, Package, Layers,
  Briefcase, Network, Zap, ShoppingCart: Package, MonitorSmartphone: Monitor, Tablet: Smartphone
};

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export function Home() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function load() {
      const pkgs = await getPackages();
      setPackages(pkgs);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        "service_xez4ehl",
        "template_qy5c5gg",
        formRef.current,
        { publicKey: "RTHndDsluEGonvMrZ" }
      );
      toast.success("Teklif talebiniz başarıyla gönderildi!");
      formRef.current.reset();
    } catch (error) {
      toast.error("Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Tümü", ...Array.from(new Set(packages.map((p) => p.category)))];
  const filtered = activeCategory === "Tümü" ? packages : packages.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#1976D2] pt-16 overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gray-900/10 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-gray-900/20 border border-gray-900/40 rounded-full px-4 py-1 mb-6">
              <Zap className="w-4 h-4 text-gray-900" />
              <span className="text-gray-900 text-sm font-medium">Türkiye'nin Lider Barkod Çözüm Ortağı</span>
            </div>
            <h1 className="text-white text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              İşletmeniz İçin <br />
              <span className="text-gray-900">Eksiksiz Barkod</span><br />
              Çözümleri
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Market, depo, restoran ve daha fazlası için hazır barkod paketleri. Kurulumdan desteğe kadar her şey dahil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#paketler"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                Paketleri Keşfet <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#iletisim"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Ücretsiz Teklif Al
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "500+", label: "Mutlu Müşteri" },
                { value: "15+", label: "Yıl Deneyim" },
                { value: "7/24", label: "Teknik Destek" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-gray-900 text-2xl font-extrabold">{s.value}</div>
                  <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 flex justify-center z-10">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gray-900/20 rounded-3xl rotate-3" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623123096729-26b481292919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Barkod Sistemleri"
                className="relative rounded-3xl shadow-2xl w-full object-cover h-72 lg:h-96 animate-float"
              />
              {/* floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="bg-[#0D47A1] rounded-xl p-2.5">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[#0D47A1] font-bold text-sm">2 Yıl Garanti</div>
                  <div className="text-gray-500 text-xs">Tüm Ürünlerde</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* wave */}
        <svg className="w-full" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </section>

      {/* ── BRAND BAR ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-12 gap-y-4 items-center">
          {["Zebra", "Honeywell", "Datalogic", "Epson", "Citizen", "Posiflex"].map((brand) => (
            <span key={brand} className="text-gray-400 font-bold text-lg tracking-wider uppercase">{brand}</span>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="paketler" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#0D47A1]/10 text-[#0D47A1] text-sm font-semibold px-4 py-1 rounded-full mb-4">Ürün Paketleri</span>
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-extrabold mb-4">İşletmenize Özel Çözümler</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Her sektöre uygun hazır barkod paketleri. Seçin, sipariş verin, kurulum yapıyoruz.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0D47A1] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#0D47A1] hover:text-[#0D47A1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-sm border-2 flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                  pkg.isPopular ? "border-gray-900" : "border-transparent"
                }`}
              >
                {pkg.badge && (
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${
                    pkg.isPopular ? "bg-gray-900 text-white" : "bg-[#0D47A1] text-white"
                  }`}>
                    {pkg.badge}
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1">
                    <span className="text-[#0D47A1] font-bold text-sm">{pkg.category}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{pkg.description}</p>

                  {/* Products preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.products.slice(0, 4).map((prod) => (
                      <div key={prod.id} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
                        <ProductIcon name={prod.icon} className="w-3.5 h-3.5 text-[#0D47A1]" />
                        <span className="text-xs text-gray-600 font-medium">{prod.name}</span>
                      </div>
                    ))}
                    {pkg.products.length > 4 && (
                      <div className="flex items-center bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
                        <span className="text-xs text-gray-400">+{pkg.products.length - 4} daha</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {pkg.features && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.features.map((f) => (
                        <div key={f} className="flex items-center gap-1 text-xs text-green-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                      {pkg.oldPrice && (
                        <div className="text-gray-400 line-through text-sm">{formatPrice(pkg.oldPrice)}</div>
                      )}
                      <div className="text-[#0D47A1] font-extrabold text-2xl">{formatPrice(pkg.price)}</div>
                    </div>
                    <Link
                      to={`/paket/${pkg.id}`}
                      className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      İncele <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="ozellikler" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-gray-900/20 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">Özellikler</span>
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-extrabold mb-4">Neden PROFSE Bilişim?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">15 yılı aşkın deneyimimizle sektörün en güvenilir barkod çözüm ortağıyız.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Garanti & Güvence", desc: "Tüm ürünlerimizde 1-2 yıl resmi garanti. Sorun yaşarsanız yanınızdayız.", color: "bg-blue-50 text-[#0D47A1]" },
              { icon: Headphones, title: "7/24 Teknik Destek", desc: "Haftanın 7 günü, günün 24 saati teknik destek ekibimiz sizin için hazır.", color: "bg-gray-900 text-white" },
              { icon: Truck, title: "Hızlı Teslimat", desc: "Sipariş verdiğiniz gün kargoya verilir, 2 iş günü içinde elinizde.", color: "bg-blue-50 text-[#0D47A1]" },
              { icon: Users, title: "Profesyonel Kurulum", desc: "Deneyimli teknisyenlerimiz sisteminizi yerinde kurar ve test eder.", color: "bg-gray-900 text-white" },
              { icon: BarChart3, title: "Yazılım Entegrasyonu", desc: "Popüler muhasebe ve stok yazılımlarıyla tam entegrasyon sağlıyoruz.", color: "bg-blue-50 text-[#0D47A1]" },
              { icon: Award, title: "Yetkili Servis", desc: "Dünyaca tanınan markaların Türkiye yetkili bayii ve servisiyiz.", color: "bg-gray-900 text-white" },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`${f.color} rounded-xl p-3 h-12 w-12 flex items-center justify-center flex-shrink-0`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1.5">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US BANNER ── */}
      <section id="neden-biz" className="py-16 bg-[#0D47A1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-white text-3xl font-extrabold mb-3">Hazır mısınız?</h2>
              <p className="text-white/70 text-lg">Uzman ekibimiz ihtiyacınıza özel paket hazırlasın.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+903426060890"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Phone className="w-5 h-5" /> Hemen Ara
              </a>
              <a
                href="#iletisim"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Mail className="w-5 h-5" /> E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#0D47A1]/10 text-[#0D47A1] text-sm font-semibold px-4 py-1 rounded-full mb-4">Müşteri Yorumları</span>
            <h2 className="text-gray-900 text-3xl font-extrabold">Müşterilerimiz Ne Diyor?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ahmet Yılmaz", role: "Market Sahibi, İstanbul", comment: "Market Barkod Paketini aldım, kurulum aynı gün yapıldı. Sistem çok hızlı çalışıyor, çok memnunum." },
              { name: "Fatma Kaya", role: "Depo Müdürü, Ankara", comment: "Depo paketi sayesinde stok takibimiz çok kolaylaştı. Teknik destek ekibi çok ilgili ve hızlı." },
              { name: "Mehmet Demir", role: "Restoran İşletmecisi, İzmir", comment: "Restoran paketini 6 aydır kullanıyorum. Siparişler artık çok daha hızlı işleniyor, müşterilerden olumlu geri dönüş alıyorum." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-gray-900 text-gray-900" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0D47A1] rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block bg-gray-900/20 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">İletişim</span>
              <h2 className="text-gray-900 text-3xl font-extrabold mb-4">Bizimle İletişime Geçin</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                İhtiyacınıza en uygun paketi belirlemek için uzman ekibimizle iletişime geçin. Ücretsiz teknik danışmanlık sunuyoruz.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Telefon", value: "(0342) 606 08 90" },
                  { icon: Mail, label: "E-posta", value: "info@profse.com.tr" },
                  { icon: MapPin, label: "Adres", value: "OSB 2. Bölge 83235 Nolu Cd. No:8, Başpınar / Gaziantep" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="bg-[#0D47A1] rounded-xl p-3">
                      <c.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-0.5">{c.label}</div>
                      <div className="text-gray-900 font-semibold">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Teklif Formu</h3>
              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1.5 block">Ad Soyad</label>
                    <input name="name" type="text" placeholder="Adınız Soyadınız" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1.5 block">Telefon</label>
                    <input name="phone" type="tel" placeholder="05XX XXX XX XX" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">E-posta</label>
                  <input name="email" type="email" placeholder="ornek@email.com" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">İlgilendiğiniz Paket</label>
                  <select name="package" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 bg-white">
                    <option value="">Seçiniz...</option>
                    {packages.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                    <option value="Özel Paket">Özel Paket</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">Mesajınız</label>
                  <textarea name="message" rows={3} placeholder="İşletmeniz hakkında kısaca bilgi verin..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/10 resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0D47A1] hover:bg-[#1565C1] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Teklif Gönder"} <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              {/* Real SVG logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-900 rounded-lg p-2 flex items-center justify-center">
                  <ProfseIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <ProfseLongLogo className="h-5 w-auto text-white" />
                  <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">
                    Bilişim
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Gaziantep merkezli barkod çözüm ortağınız. Market, depo, restoran ve daha fazla sektöre profesyonel hizmet veriyoruz.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Hızlı Bağlantılar</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#paketler" className="hover:text-white transition-colors">Paketler</a></li>
                <li><a href="#ozellikler" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#neden-biz" className="hover:text-white transition-colors">Neden Biz?</a></li>
                <li><a href="#iletisim" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">İletişim</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <a href="tel:+903426060890" className="hover:text-white transition-colors">
                    (0342) 606 08 90
                  </a>
                </li>
                <li>
                  <a href="mailto:info@profse.com.tr" className="hover:text-white transition-colors">
                    info@profse.com.tr
                  </a>
                </li>
                <li className="leading-relaxed">
                  OSB 2. Bölge 83235 Nolu Cd.<br />
                  No:8, Başpınar / Gaziantep
                </li>
                <li className="text-green-400">Pzt–Cmt: 09:00–18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2025 PROFSE Bilişim. Tüm hakları saklıdır.</p>
            <Link to="/admin" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Yönetim Paneli</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}