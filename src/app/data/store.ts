export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  quantity: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  products: Product[];
  badge?: string;
  isPopular?: boolean;
  features?: string[];
  createdAt: string;
}

const defaultPackages: Package[] = [
  {
    id: "pkg-1",
    name: "Market Barkod Paketi",
    description: "Küçük ve orta ölçekli marketler için eksiksiz barkod çözümü. Kasadan depoya her şey dahil.",
    price: 12500,
    oldPrice: 15000,
    category: "Market",
    image: "https://images.unsplash.com/photo-1623123096729-26b481292919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "En Çok Satan",
    isPopular: true,
    features: ["1 Yıl Garanti", "Ücretsiz Kurulum", "7/24 Destek"],
    products: [
      { id: "p1", name: "Barkod Okuyucu", description: "USB Lazer Barkod Tarayıcı", icon: "Scan", quantity: 2 },
      { id: "p2", name: "Barkod Yazıcı", description: "Termal Etiket Yazıcısı", icon: "Printer", quantity: 1 },
      { id: "p3", name: "Monitör", description: '22" Full HD IPS Ekran', icon: "Monitor", quantity: 1 },
      { id: "p4", name: "Bilgisayar", description: "Intel i5 16GB RAM Masaüstü", icon: "Computer", quantity: 1 },
      { id: "p5", name: "Terazi", description: "Dijital Elektronik Terazi 30kg", icon: "Scale", quantity: 1 },
      { id: "p6", name: "Fiş Yazıcı", description: "80mm Termal Fiş Yazıcı", icon: "Receipt", quantity: 1 },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "pkg-2",
    name: "Depo Barkod Paketi",
    description: "Büyük depolar ve lojistik firmaları için gelişmiş stok yönetim sistemi.",
    price: 18900,
    oldPrice: 22000,
    category: "Depo",
    image: "https://images.unsplash.com/photo-1758543102397-e14b5dfdd8bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "Profesyonel",
    isPopular: false,
    features: ["2 Yıl Garanti", "Ücretsiz Kurulum", "Yazılım Dahil"],
    products: [
      { id: "p7", name: "El Terminali", description: "Android Taşınabilir Barkod Terminali", icon: "Smartphone", quantity: 3 },
      { id: "p8", name: "Barkod Yazıcı", description: "Endüstriyel Termal Transfer Yazıcı", icon: "Printer", quantity: 2 },
      { id: "p9", name: "Barkod Okuyucu", description: "Uzun Menzilli 2D Barkod Tarayıcı", icon: "Scan", quantity: 2 },
      { id: "p10", name: "Sunucu", description: "Depo Yönetim Sunucusu", icon: "Server", quantity: 1 },
      { id: "p11", name: "Yazılım Lisansı", description: "Depo Yönetim Yazılımı 1 Yıl", icon: "Package", quantity: 1 },
    ],
    createdAt: "2024-02-10",
  },
  {
    id: "pkg-3",
    name: "Restoran Barkod Paketi",
    description: "Restoranlar, kafeler ve yiyecek-içecek işletmeleri için sipariş ve stok yönetimi.",
    price: 9800,
    oldPrice: 11500,
    category: "Restoran",
    image: "https://images.unsplash.com/photo-1762340275718-9190c870405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "Yeni",
    isPopular: false,
    features: ["1 Yıl Garanti", "Eğitim Dahil", "Bulut Yedekleme"],
    products: [
      { id: "p12", name: "Dokunmatik Monitör", description: '15" Kapasitif Dokunmatik Ekran', icon: "Monitor", quantity: 1 },
      { id: "p13", name: "Fiş Yazıcı", description: "Mutfak ve Kasa Fiş Yazıcısı", icon: "Receipt", quantity: 2 },
      { id: "p14", name: "El Terminali", description: "Garson Sipariş Tableti", icon: "Tablet", quantity: 2 },
      { id: "p15", name: "Barkod Okuyucu", description: "2D QR & Barkod Tarayıcı", icon: "Scan", quantity: 1 },
      { id: "p16", name: "Yazılım Lisansı", description: "Restoran POS Yazılımı", icon: "ShoppingCart", quantity: 1 },
    ],
    createdAt: "2024-03-05",
  },
  {
    id: "pkg-4",
    name: "Tekstil Barkod Paketi",
    description: "Mağaza ve tekstil işletmeleri için etiketleme ve stok takip sistemi.",
    price: 7500,
    category: "Mağaza",
    image: "https://images.unsplash.com/photo-1623123096729-26b481292919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    isPopular: false,
    features: ["1 Yıl Garanti", "Ücretsiz Kurulum", "Telefon Destek"],
    products: [
      { id: "p17", name: "Barkod Yazıcı", description: "Termal Etiket Yazıcısı", icon: "Printer", quantity: 1 },
      { id: "p18", name: "Barkod Okuyucu", description: "USB Barkod Tarayıcı", icon: "Scan", quantity: 1 },
      { id: "p19", name: "Etiket Sarma Makinesi", description: "Otomatik Etiket Sarma", icon: "Layers", quantity: 1 },
      { id: "p20", name: "Yazılım Lisansı", description: "Mağaza Stok Yönetim Yazılımı", icon: "Package", quantity: 1 },
    ],
    createdAt: "2024-03-20",
  },
];

const STORAGE_KEY = "profse_packages";

export function getPackages(): Package[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultPackages;
}

export function savePackages(packages: Package[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find((p) => p.id === id);
}

export function createPackage(pkg: Omit<Package, "id" | "createdAt">): Package {
  const packages = getPackages();
  const newPkg: Package = {
    ...pkg,
    id: `pkg-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  packages.push(newPkg);
  savePackages(packages);
  return newPkg;
}

export function updatePackage(id: string, updates: Partial<Package>): Package | null {
  const packages = getPackages();
  const index = packages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  packages[index] = { ...packages[index], ...updates };
  savePackages(packages);
  return packages[index];
}

export function deletePackage(id: string): boolean {
  const packages = getPackages();
  const filtered = packages.filter((p) => p.id !== id);
  if (filtered.length === packages.length) return false;
  savePackages(filtered);
  return true;
}

export const CATEGORIES = ["Market", "Depo", "Restoran", "Mağaza", "Eczane", "Kafe", "Diğer"];

export const AVAILABLE_PRODUCTS = [
  { name: "Barkod Okuyucu", icon: "Scan" },
  { name: "Barkod Yazıcı", icon: "Printer" },
  { name: "Monitör", icon: "Monitor" },
  { name: "Dokunmatik Monitör", icon: "Monitor" },
  { name: "Bilgisayar", icon: "Computer" },
  { name: "El Terminali", icon: "Smartphone" },
  { name: "Fiş Yazıcı", icon: "Receipt" },
  { name: "Terazi", icon: "Scale" },
  { name: "Sunucu", icon: "Server" },
  { name: "Yazılım Lisansı", icon: "Package" },
  { name: "Etiket Sarma Makinesi", icon: "Layers" },
  { name: "Para Çekmecesi", icon: "Briefcase" },
  { name: "Müşteri Ekranı", icon: "MonitorSmartphone" },
  { name: "UPS Güç Kaynağı", icon: "Zap" },
  { name: "Ağ Anahtarı", icon: "Network" },
];
